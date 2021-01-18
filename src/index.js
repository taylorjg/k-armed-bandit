import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import random from 'random'
import { Chart } from 'chart.js'

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

const range = n => Array.from(Array(n).keys())

const randomChoice = xs => xs[Math.floor(Math.random() * xs.length)]

const argmax = xs => {
  let topValue = Number.NEGATIVE_INFINITY
  let ties = []
  xs.forEach((value, index) => {
    if (value > topValue) {
      topValue = value
      ties = [index]
    } else {
      if (value === topValue) {
        ties.push(index)
      }
    }
  })
  return ties.length === 1 ? ties[0] : randomChoice(ties)
}

const makeTrueValues = k => {
  const mean = 0
  const variance = 1
  const normal = random.normal(mean, variance)
  const trueValues = range(k).map(normal)
  return trueValues
}

const makeArmDistributions = k => {
  const trueValues = makeTrueValues(k)
  const armDistributions = trueValues.map((trueValue, arm) => {
    const mean = trueValue
    const variance = 1
    const normal = random.normal(mean, variance)
    return { arm, trueValue, normal }
  })
  return armDistributions
}

const bandit = (experiment, armDistributions, optimalArm, arms, t) => {
  const arm = experiment.chooseArm(arms, t, experiment.ns, experiment.qs)
  const reward = armDistributions[arm].normal()
  const n = experiment.ns[arm] + 1
  experiment.ns[arm] = n
  const oldEstimate = experiment.qs[arm]
  const newEstimate = oldEstimate + (1 / n) * (reward - oldEstimate)
  experiment.qs[arm] = newEstimate
  const isOptimal = arm === optimalArm
  return { reward, isOptimal }
}

const k = 10
const runs = 2000
const steps = 1000

const greedy = (_arms, _t, _ns, qs) =>
  argmax(qs)

const epsilonGreedy = epsilon => (arms, _t, _ns, qs) =>
  Math.random() < epsilon ? randomChoice(arms) : argmax(qs)

const upperConfidenceBound = c => (_arms, t, ns, qs) => {
  const values = qs.map((q, index) => {
    const n = ns[index]
    if (n === 0) return Number.MAX_SAFE_INTEGER
    return q + c * Math.sqrt(Math.log(t) / n)
  })
  return argmax(values)
}

const experiments = [
  {
    label: 'greedy',
    colour: 'green',
    chooseArm: greedy,
    ns: [],
    qs: []
  },
  {
    label: 'ε-greedy, ε = 0.01',
    colour: 'red',
    chooseArm: epsilonGreedy(0.01),
    ns: [],
    qs: []
  },
  {
    label: 'ε-greedy, ε = 0.1',
    colour: 'blue',
    chooseArm: epsilonGreedy(0.1),
    ns: [],
    qs: []
  },
  {
    label: 'UCB, c = 2',
    colour: 'purple',
    chooseArm: upperConfidenceBound(2),
    ns: [],
    qs: []
  }
]

const results = experiments.map(() => ({
  runningAverageReward: Array(steps).fill(0),
  runningAveragePercentOptimalAction: Array(steps).fill(0)
}))

const runExperiments = (experiments, armDistributions, optimalArm, arms, steps) => {
  for (const experiment of experiments) {
    experiment.ns = Array(k).fill(0)
    experiment.qs = Array(k).fill(0)
  }
  return range(steps).map(step =>
    experiments.map(experiment => bandit(experiment, armDistributions, optimalArm, arms, step + 1))
  )
}

range(runs).forEach(run => {
  const n = run + 1
  const armDistributions = makeArmDistributions(k)
  const arms = range(k)
  const trueValues = armDistributions.map(({ trueValue }) => trueValue)
  const optimalArm = argmax(trueValues)
  const stepResults = runExperiments(experiments, armDistributions, optimalArm, arms, steps)
  stepResults.forEach((stepResult, step) => {
    stepResult.forEach(({ reward, isOptimal }, experimentIndex) => {

      const oldAverage1 = results[experimentIndex].runningAverageReward[step]
      const newAverage1 = oldAverage1 + (1 / n) * (reward - oldAverage1)
      results[experimentIndex].runningAverageReward[step] = newAverage1

      const percentOptimalAction = isOptimal ? 100 : 0
      const oldAverage2 = results[experimentIndex].runningAveragePercentOptimalAction[step]
      const newAverage2 = oldAverage2 + (1 / n) * (percentOptimalAction - oldAverage2)
      results[experimentIndex].runningAveragePercentOptimalAction[step] = newAverage2
    })
  })
})

const drawLines = (chartElement, lines) => {
  const makeDataset = line => ({
    data: line.data,
    label: line.label,
    fill: false,
    borderColor: line.colour,
    borderWidth: 1,
    radius: 0
  })
  new Chart(chartElement, {
    type: 'line',
    data: {
      datasets: lines.map(makeDataset)
    },
    options: {
      scales: {
        xAxes: [{
          labels: lines[0].data.map((_, index) => index + 1)
        }]
      },
      events: [],
      animation: {
        duration: 0
      }
    }
  })
}

const lines1 = experiments.map((experiment, index) => ({
  label: experiment.label,
  colour: experiment.colour,
  data: results[index].runningAverageReward
}))
drawLines('chart1', lines1)

const lines2 = experiments.map((experiment, index) => ({
  label: experiment.label,
  colour: experiment.colour,
  data: results[index].runningAveragePercentOptimalAction
}))
drawLines('chart2', lines2)
