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

const bandit = (experiment, armDistributions, optimalArm, t) => {
  const arm = experiment.actionSelector.selectAction(
    experiment.actions,
    experiment.ns,
    experiment.qs,
    t)
  const reward = armDistributions[arm].normal()
  const n = experiment.ns[arm] + 1
  experiment.ns[arm] = n
  const oldEstimate = experiment.qs[arm]
  const alpha = experiment.stepSizeCalculator(n)
  const newEstimate = oldEstimate + alpha * (reward - oldEstimate)
  experiment.qs[arm] = newEstimate
  const isOptimal = arm === optimalArm
  return { reward, isOptimal }
}

const K = 10
const ACTIONS = range(K)
const RUNS = 2000
const STEPS = 1000

class GreedyActionSelector {
  get name() {
    return 'greedy'
  }

  selectAction(_actions, _ns, qs, _t) {
    return argmax(qs)
  }
}

class EpsilonGreedyActionSelector {
  constructor(epsilon) {
    this.epsilon = epsilon
  }

  get name() {
    return `ε-greedy, ε = ${this.epsilon}`
  }

  selectAction(actions, _ns, qs, _t) {
    return Math.random() < this.epsilon
      ? randomChoice(actions)
      : argmax(qs)
  }
}

class UCBActionSelector {
  constructor(c) {
    this.c = c
  }

  get name() {
    return `UCB, c = ${this.c}`
  }

  selectAction(_actions, ns, qs, t) {
    return argmax(this.ucb(ns, qs, t))
  }

  ucb(ns, qs, t) {
    return qs.map((q, index) => {
      const n = ns[index]
      if (n === 0) return Number.MAX_VALUE
      return q + this.c * Math.sqrt(Math.log(t) / n)
    })
  }
}

const constantStepSizeCalculator = stepSize => _n => stepSize
const decayingStepSizeCalculator = n => 1 / n

const defaultStepSizeCalculator = decayingStepSizeCalculator

class Experiment {
  constructor(actions, actionSelector, stepSizeCalculator, colour, initialValue = 0) {
    this.actions = actions
    this.actionSelector = actionSelector
    this.stepSizeCalculator = stepSizeCalculator
    this.colour = colour
    this.initialValue = initialValue
    this.ns = []
    this.qs = []
  }

  reset() {
    this.ns = Array(this.actions.length).fill(0)
    this.qs = Array(this.actions.length).fill(this.initialValue)
  }
}

const experiments = [
  new Experiment(ACTIONS, new GreedyActionSelector(), defaultStepSizeCalculator, 'green'),
  new Experiment(ACTIONS, new EpsilonGreedyActionSelector(0.01), defaultStepSizeCalculator, 'red'),
  new Experiment(ACTIONS, new EpsilonGreedyActionSelector(0.1), defaultStepSizeCalculator, 'blue'),
  new Experiment(ACTIONS, new UCBActionSelector(2), defaultStepSizeCalculator, 'purple'),
  new Experiment(ACTIONS, new GreedyActionSelector(), constantStepSizeCalculator(0.1), 'cyan', 5),
  new Experiment(ACTIONS, new EpsilonGreedyActionSelector(0.1), constantStepSizeCalculator(0.1), 'grey', 0)
]

const results = experiments.map(() => ({
  runningAverageReward: Array(STEPS).fill(0),
  runningAveragePercentOptimalAction: Array(STEPS).fill(0)
}))

const runExperiments = (experiments, armDistributions, steps) => {
  experiments.forEach(experiment => experiment.reset())
  const trueValues = armDistributions.map(({ trueValue }) => trueValue)
  const optimalArm = argmax(trueValues)
  return range(steps).map(step =>
    experiments.map(experiment => bandit(experiment, armDistributions, optimalArm, step + 1))
  )
}

range(RUNS).forEach(run => {
  const n = run + 1
  const armDistributions = makeArmDistributions(K)
  const stepResults = runExperiments(experiments, armDistributions, STEPS)
  stepResults.forEach((stepResult, step) => {
    stepResult.forEach(({ reward, isOptimal }, experimentIndex) => {
      const experimentResults = results[experimentIndex]

      {
        const oldAverage = experimentResults.runningAverageReward[step]
        const newAverage = oldAverage + (1 / n) * (reward - oldAverage)
        experimentResults.runningAverageReward[step] = newAverage
      }

      {
        const percentOptimalAction = isOptimal ? 100 : 0
        const oldAverage = experimentResults.runningAveragePercentOptimalAction[step]
        const newAverage = oldAverage + (1 / n) * (percentOptimalAction - oldAverage)
        experimentResults.runningAveragePercentOptimalAction[step] = newAverage
      }
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
  label: experiment.actionSelector.name,
  colour: experiment.colour,
  data: results[index].runningAverageReward
}))
drawLines('chart1', lines1)

const lines2 = experiments.map((experiment, index) => ({
  label: experiment.actionSelector.name,
  colour: experiment.colour,
  data: results[index].runningAveragePercentOptimalAction
}))
drawLines('chart2', lines2)
