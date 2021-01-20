import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import * as D from './diagrams'
import * as L from './logic'
import * as U from './utils'

import worker from 'workerize-loader!./worker' // eslint-disable-line import/no-webpack-loader-syntax

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

const K = 10
const ACTIONS = U.range(K)
const RUNS = 2000
const STEPS = 1000

const experiments = [
  new L.Experiment(ACTIONS, new L.GreedyActionSelector(), L.decayingStepSizeCalculator, 'green'),
  new L.Experiment(ACTIONS, new L.EpsilonGreedyActionSelector(0.01), L.decayingStepSizeCalculator, 'red'),
  new L.Experiment(ACTIONS, new L.EpsilonGreedyActionSelector(0.1), L.decayingStepSizeCalculator, 'blue'),
  new L.Experiment(ACTIONS, new L.UCBActionSelector(2), L.decayingStepSizeCalculator, 'purple'),
  new L.Experiment(ACTIONS, new L.GreedyActionSelector(), L.constantStepSizeCalculator(0.1), 'cyan', 5),
  new L.Experiment(ACTIONS, new L.EpsilonGreedyActionSelector(0.1), L.constantStepSizeCalculator(0.1), 'grey', 0)
]

const results = experiments.map(() => new L.ExperimentResults(STEPS))

const runExperiments = (testBed, experiments, steps) => {
  experiments.forEach(experiment => experiment.reset())
  return U.range(steps).map(step =>
    experiments.map(experiment => L.bandit(testBed, experiment, step + 1))
  )
}

U.range(RUNS).forEach(run => {
  const n = run + 1
  const testBed = new L.TestBed(K)
  const stepResults = runExperiments(testBed, experiments, STEPS)
  stepResults.forEach((stepResult, step) => {
    stepResult.forEach(({ reward, isOptimal }, experimentIndex) => {
      results[experimentIndex].update(step, n, reward, isOptimal)
    })
  })
})

const lines1 = experiments.map((experiment, index) => ({
  label: experiment.actionSelector.name,
  colour: experiment.colour,
  data: results[index].runningAverageReward
}))
D.drawDiagram('chart1', lines1)

const lines2 = experiments.map((experiment, index) => ({
  label: experiment.actionSelector.name,
  colour: experiment.colour,
  data: results[index].runningAveragePercentOptimalAction
}))
D.drawDiagram('chart2', lines2)

const onMessage = message => {
  if (message.data.type === 'addNumbersResult') {
    console.log(`[onMessage] message.data: ${JSON.stringify(message.data)}`)
  }
}

const workerInstance = worker()
workerInstance.addEventListener('message', onMessage)
workerInstance.addNumbers(1, 2)
