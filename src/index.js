import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import * as D from './diagrams'
import * as L from './logic'
import * as U from './utils'

// eslint-disable-next-line import/no-webpack-loader-syntax
import worker from 'workerize-loader!./worker'

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
const NUM_WORKERS = 4

const experimentsConfig = [
  {
    actionSelector: ['GreedyActionSelector'],
    stepSizeCalculator: ['decayingStepSizeCalculator'],
    colour: 'green'
  },
  {
    actionSelector: ['EpsilonGreedyActionSelector', 0.01],
    stepSizeCalculator: ['decayingStepSizeCalculator'],
    colour: 'red'
  },
  {
    actionSelector: ['EpsilonGreedyActionSelector', 0.1],
    stepSizeCalculator: ['decayingStepSizeCalculator'],
    colour: 'blue'
  },
  {
    actionSelector: ['UCBActionSelector', 2],
    stepSizeCalculator: ['decayingStepSizeCalculator'],
    colour: 'purple'
  },
  // {
  //   actionSelector: ['GreedyActionSelector'],
  //   stepSizeCalculator: ['constantStepSizeCalculator', 0.1],
  //   colour: 'cyan',
  //   initialValue: 5
  // },
  // {
  //   actionSelector: ['EpsilonGreedyActionSelector', 0.1],
  //   stepSizeCalculator: ['constantStepSizeCalculator', 0.1],
  //   colour: 'grey'
  // }
]

const experiments = experimentsConfig.map(experimentConfig =>
  L.makeExperiment(experimentConfig, ACTIONS))

const drawDiagrams = results => {

  const lines1 = experiments.map((experiment, experimentIndex) => ({
    label: experiment.name,
    colour: experiment.colour,
    data: results[experimentIndex].averageRewardsPerStep
  }))
  D.drawDiagram('chart1', lines1)

  const lines2 = experiments.map((experiment, experimentIndex) => ({
    label: experiment.name,
    colour: experiment.colour,
    data: results[experimentIndex].averagePercentOptimalActionsPerStep
  }))
  D.drawDiagram('chart2', lines2)
}

const workerResults = []
let runs = 0

const pluckValueAtStep = (propName, workerResults, experimentIndex, step) =>
  workerResults.map(wr => wr[experimentIndex][propName][step])

const pluckValue = (propName, workerResults, experimentIndex) =>
  U.range(STEPS).map(step => pluckValueAtStep(propName, workerResults, experimentIndex, step))

const averageAcrossWorkers = (propName, workerResults, experimentIndex) =>
  pluckValue(propName, workerResults, experimentIndex).map(U.average)

const combineResults = workerResults => {
  const finalResults = U.range(experiments.length).map(experimentIndex => {
    return {
      averageRewardsPerStep: averageAcrossWorkers(
        'averageRewards',
        workerResults,
        experimentIndex),
      averagePercentOptimalActionsPerStep: averageAcrossWorkers(
        'averagePercentOptimalActions',
        workerResults,
        experimentIndex)
    }
  })
  return finalResults
}

const onMessage = message => {

  if (message.data.type === 'runExperimentsRunCompleted') {
    runs += 1
    console.log(`[onMessage runExperimentsRunCompleted] workerIndex: ${message.data.workerIndex}; runs: ${runs}`)
  }

  if (message.data.type === 'runExperimentsResults') {
    console.log(`[onMessage runExperimentsResults] workerIndex: ${message.data.workerIndex}`)
    workerResults.push(message.data.results)
    if (workerResults.length === NUM_WORKERS) {
      const finalResults = combineResults(workerResults)
      drawDiagrams(finalResults)
    }
  }
}

const workerInstances = U.range(NUM_WORKERS).map(worker)

workerInstances.forEach(workerInstance =>
  workerInstance.addEventListener('message', onMessage))

const workerMessage = {
  K,
  ACTIONS,
  RUNS: RUNS / NUM_WORKERS,
  STEPS,
  experimentsConfig
}

workerInstances.forEach((workerInstance, workerIndex) =>
  workerInstance.runExperiments(workerMessage, workerIndex))
