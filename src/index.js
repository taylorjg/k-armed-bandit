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

const average = xs => {
  const sum = xs.reduce((acc, x) => acc + x, 0)
  const count = xs.length
  return sum / count
}

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

const bandit = (armDistributions, optimalArm, epsilon, steps) => {
  const k = armDistributions.length
  const arms = range(k)
  const ns = Array(k).fill(0)
  const qs = Array(k).fill(0)
  const rewards = []
  range(steps).forEach(() => {
    const arm = Math.random() < epsilon ? randomChoice(arms) : argmax(qs)
    const isOptimal = arm === optimalArm
    const reward = armDistributions[arm].normal()
    rewards.push(reward)
    const n = ns[arm] + 1
    ns[arm] = n
    const oldEstimate = qs[arm]
    const newEstimate = oldEstimate + (1 / n) * (reward - oldEstimate)
    qs[arm] = newEstimate
  })
  return rewards
}

const k = 10
const runs = 2000
const steps = 1000

const setsOfRewards1 = []
const setsOfRewards2 = []
const setsOfRewards3 = []

range(runs).forEach(() => {
  const armDistributions = makeArmDistributions(k)
  const trueValues = armDistributions.map(({ trueValue }) => trueValue)
  const optimalArm = argmax(trueValues)
  const setOfRewards1 = bandit(armDistributions, optimalArm, 0, steps)
  const setOfRewards2 = bandit(armDistributions, optimalArm, 0.01, steps)
  const setOfRewards3 = bandit(armDistributions, optimalArm, 0.1, steps)
  setsOfRewards1.push(setOfRewards1)
  setsOfRewards2.push(setOfRewards2)
  setsOfRewards3.push(setOfRewards3)
})

const averageRewards1 = []
const averageRewards2 = []
const averageRewards3 = []

range(steps).forEach(step => {
  const rewards = setsOfRewards1.map(setOfRewards => setOfRewards[step])
  const averageReward = average(rewards)
  averageRewards1.push(averageReward)
})

range(steps).forEach(step => {
  const rewards = setsOfRewards2.map(setOfRewards => setOfRewards[step])
  const averageReward = average(rewards)
  averageRewards2.push(averageReward)
})

range(steps).forEach(step => {
  const rewards = setsOfRewards3.map(setOfRewards => setOfRewards[step])
  const averageReward = average(rewards)
  averageRewards3.push(averageReward)
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
  { data: averageRewards1, label: 'greedy', colour: 'green' },
  { data: averageRewards2, label: 'ε = 0.01', colour: 'red' },
  { data: averageRewards3, label: 'ε = 0.1', colour: 'blue' }
]

drawLines(lines)
