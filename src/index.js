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

const bandit = (experiment, armDistributions, optimalArm, arms) => {
  const arm = Math.random() < experiment.epsilon
    ? randomChoice(arms)
    : argmax(experiment.qs)
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

const experiments = [
  {
    label: 'greedy',
    colour: 'green',
    epsilon: 0,
    ns: [],
    qs: []
  },
  {
    label: 'ε = 0.01',
    colour: 'red',
    epsilon: 0.01,
    ns: [],
    qs: []
  },
  {
    label: 'ε = 0.1',
    colour: 'blue',
    epsilon: 0.1,
    ns: [],
    qs: []
  }
]

const results = [
  {
    runningAverageReward: Array(steps).fill(0),
    runningAveragePercentOptimalAction: Array(steps).fill(0)
  },
  {
    runningAverageReward: Array(steps).fill(0),
    runningAveragePercentOptimalAction: Array(steps).fill(0)
  },
  {
    runningAverageReward: Array(steps).fill(0),
    runningAveragePercentOptimalAction: Array(steps).fill(0)
  }
]

const runExperiments = (experiments, armDistributions, optimalArm, arms, steps) => {
  for (const experiment of experiments) {
    experiment.ns = Array(k).fill(0)
    experiment.qs = Array(k).fill(0)
  }
  return range(steps).map(() =>
    experiments.map(experiment => bandit(experiment, armDistributions, optimalArm, arms))
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
      const oldRunningAverageReward = results[experimentIndex].runningAverageReward[step]
      const newRunningAverageReward = oldRunningAverageReward + (1 / n) * (reward - oldRunningAverageReward)
      results[experimentIndex].runningAverageReward[step] = newRunningAverageReward

      const percentOptimalAction = isOptimal ? 100 : 0
      const oldRunningAveragePercentOptimalAction = results[experimentIndex].runningAveragePercentOptimalAction[step]
      const newRunningAveragePercentOptimalAction = oldRunningAveragePercentOptimalAction + (1 / n) * (percentOptimalAction - oldRunningAveragePercentOptimalAction)
      results[experimentIndex].runningAveragePercentOptimalAction[step] = newRunningAveragePercentOptimalAction
    })
  })
})

const drawLines = lines => {
  const makeDataset = line => ({
    data: line.data,
    label: line.label,
    fill: false,
    borderColor: line.colour,
    borderWidth: 1,
    radius: 0
  })
  const chartElement = document.getElementById('chart')
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

const lines = [
  {
    label: experiments[0].label,
    colour: experiments[0].colour,
    data: results[0].runningAverageReward
  },
  {
    label: experiments[1].label,
    colour: experiments[1].colour,
    data: results[1].runningAverageReward
  },
  {
    label: experiments[2].label,
    colour: experiments[2].colour,
    data: results[2].runningAverageReward
  }
]

// const lines = [
//   {
//     label: experiments[0].label,
//     colour: experiments[0].colour,
//     data: results[0].runningAveragePercentOptimalAction
//   },
//   {
//     label: experiments[1].label,
//     colour: experiments[1].colour,
//     data: results[1].runningAveragePercentOptimalAction
//   },
//   {
//     label: experiments[2].label,
//     colour: experiments[2].colour,
//     data: results[2].runningAveragePercentOptimalAction
//   }
// ]

drawLines(lines)
