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

const makeTrueValues = k => {
  const mean = 0
  const variance = 1
  const normal = random.normal(mean, variance)
  const trueValues = range(k).map(normal)
  return trueValues
}

const makeArmDistributions = k => {
  const trueValues = makeTrueValues(k)
  const armDistributions = trueValues.map(trueValue => {
    const mean = trueValue
    const variance = 1
    const normal = random.normal(mean, variance)
    return { trueValue, normal }
  })
  return armDistributions
}

const pullArm = (armDistributions, arm) =>
  armDistributions[arm].normal()

const k = 10
const armDistributions = makeArmDistributions(k)
console.dir(armDistributions)
const arm = 3
const data = range(500).map(x => pullArm(armDistributions, arm))

const chartElement = document.getElementById('chart')

new Chart(chartElement, {
  type: 'line',
  data: {
    datasets: [
      {
        label: `Arm ${arm}`,
        data,
        fill: false,
        borderColor: 'red',
        lineTension: 0
      }
    ]
  },
  options: {
    scales: {
      xAxes: [{
        labels: data.map((_, index) => index + 1)
      }]
    },
    events: [],
    animation: {
      duration: 0
    }
  }
})
