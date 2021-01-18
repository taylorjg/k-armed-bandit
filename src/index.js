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

const argmax = qs => {
  let topValue = Number.NEGATIVE_INFINITY
  let ties = []
  for (const [arm, value] of qs) {
    if (value > topValue) {
      topValue = value
      ties = [arm]
    } else {
      if (value === topValue) {
        ties.push(arm)
      }
    }
  }
  return ties.length > 1 ? randomChoice(ties) : ties[0]
}

const bandit = (armDistributions, epsilon, steps) => {
  const arms = armDistributions.map(({ arm }) => arm)
  const ns = new Map(arms.map(arm => [arm, 0]))
  const qs = new Map(arms.map(arm => [arm, 0]))
  const rewards = []
  range(steps).forEach(() => {
    const arm = Math.random() < epsilon ? randomChoice(arms) : argmax(qs)
    const reward = armDistributions[arm].normal()
    rewards.push(reward)
    const oldCount = ns.get(arm)
    const newCount = oldCount + 1
    ns.set(arm, newCount)
    const oldQValue = qs.get(arm)
    const newQValue = oldQValue + (1 / newCount) * (reward - oldQValue)
    qs.set(arm, newQValue)
  })
  console.log('ns:', ns)
  console.log('qs:', qs)
  return rewards
}

const drawChart = (data1, label1, data2, label2, data3, label3) => {
  const chartElement = document.getElementById('chart')
  new Chart(chartElement, {
    type: 'line',
    data: {
      datasets: [
        {
          data: data1,
          label: label1,
          fill: false,
          borderColor: 'green',
          borderWidth: 1,
          radius: 0,
          lineTension: 0
        },
        {
          data: data2,
          label: label2,
          fill: false,
          borderColor: 'red',
          borderWidth: 1,
          radius: 0,
          lineTension: 0
        },
        {
          data: data3,
          label: label3,
          fill: false,
          borderColor: 'blue',
          borderWidth: 1,
          radius: 0,
          lineTension: 0
        }
      ]
    },
    options: {
      scales: {
        xAxes: [{
          labels: data1.map((_, index) => index + 1)
        }]
      },
      events: [],
      animation: {
        duration: 0
      }
    }
  })
}

const k = 10
const runs = 2000
const steps = 1000

const setsOfRewards1 = []
const setsOfRewards2 = []
const setsOfRewards3 = []

range(runs).forEach(() => {
  const armDistributions = makeArmDistributions(k)
  const setOfRewards1 = bandit(armDistributions, 0, steps)
  const setOfRewards2 = bandit(armDistributions, 0.01, steps)
  const setOfRewards3 = bandit(armDistributions, 0.1, steps)
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

drawChart(
  averageRewards1, 'greedy',
  averageRewards2, 'ε = 0.01',
  averageRewards3, 'ε = 0.1'
)
