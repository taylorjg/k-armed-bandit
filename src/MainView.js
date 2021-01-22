import React, { useEffect, useRef, useState } from 'react'
import * as D from './diagrams'
import * as L from './logic'
import * as U from './utils'
import './MainView.css'

// eslint-disable-next-line import/no-webpack-loader-syntax
import worker from 'workerize-loader!./worker'

// --------------------------------------------------------------------------------

const pluckValueFromStep = (propertyName, workerResults, experimentIndex, step) =>
  workerResults.map(wr => wr[experimentIndex][propertyName][step])

const pluckValuesFromSteps = (propertyName, workerResults, experimentIndex, numSteps) =>
  U.range(numSteps).map(step =>
    pluckValueFromStep(propertyName, workerResults, experimentIndex, step))

const averageAcrossWorkers = (propertyName, workerResults, experimentIndex, numSteps) => {
  const workerValuesPerStep = pluckValuesFromSteps(propertyName, workerResults, experimentIndex, numSteps)
  // step   0: [w0, w1, w2, w3]
  // step   1: [w0, w1, w2, w3]
  // ...
  // step 999: [w0, w1, w2, w3]
  return workerValuesPerStep.map(U.average)
}

// wr0: [exp0, exp1, exp2, exp4]
// wr1: [exp0, exp1, exp2, exp4]
// wr2: [exp0, exp1, exp2, exp4]
// wr3: [exp0, exp1, exp2, exp4]
// where:
// exp0: { averageRewardsPerStep: [v0, v1, ...v999], averagePercentOptimalActions: [v0, v1, ...v999]}
// exp1: { averageRewardsPerStep: [v0, v1, ...v999], averagePercentOptimalActions: [v0, v1, ...v999]}
// exp2: { averageRewardsPerStep: [v0, v1, ...v999], averagePercentOptimalActions: [v0, v1, ...v999]}
// exp3: { averageRewardsPerStep: [v0, v1, ...v999], averagePercentOptimalActions: [v0, v1, ...v999]}
const combineWorkerResults = workerResults => {

  const firstWorkerResult = workerResults[0]
  const firstExperiment = firstWorkerResult[0]

  const numExperiments = firstWorkerResult.length
  const numSteps = firstExperiment.averageRewards.length

  const finalResults = U.range(numExperiments).map(experimentIndex => ({
    averageRewardsPerStep: averageAcrossWorkers(
      'averageRewards',
      workerResults,
      experimentIndex,
      numSteps),
    averagePercentOptimalActionsPerStep: averageAcrossWorkers(
      'averagePercentOptimalActions',
      workerResults,
      experimentIndex,
      numSteps)
  }))
  return finalResults
}

// --------------------------------------------------------------------------------

const drawDiagrams = (experiments, results) => {

  const lines1 = experiments.map((experiment, experimentIndex) => ({
    label: experiment.name,
    colour: experiment.colour,
    data: results[experimentIndex].averageRewardsPerStep
  }))
  D.drawDiagram('chart1', lines1, {
    label: 'Average reward'
  })

  const lines2 = experiments.map((experiment, experimentIndex) => ({
    label: experiment.name,
    colour: experiment.colour,
    data: results[experimentIndex].averagePercentOptimalActionsPerStep
  }))
  D.drawDiagram('chart2', lines2, {
    label: '% Optimal action',
    min: 0,
    max: 100
  })
}

// --------------------------------------------------------------------------------

const K = 10
const ACTIONS = U.range(K)
const RUNS = 2000
const STEPS = 1000
const NUM_WORKERS = 4

const MainView = () => {

  const [experimentsConfig] = useState(() => [
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
    }
  ])

  const [experiments] = useState(() =>
    experimentsConfig.map(experimentConfig =>
      L.makeExperiment(experimentConfig, ACTIONS)))

  const workerResultsRef = useRef([])

  const [runsCompletedCount, setRunsCompletedCount] = useState(0)

  const onMessage = message => {
    switch (message.data.type) {

      case 'runExperimentsRunCompleted':
        setRunsCompletedCount(count => count + 1)
        break

      case 'runExperimentsResults':
        workerResultsRef.current.push(message.data.results)
        if (workerResultsRef.current.length === NUM_WORKERS) {
          const finalResults = combineWorkerResults(workerResultsRef.current)
          drawDiagrams(experiments, finalResults)
        }
        break

      case 'RPC':
      default:
        return
    }
  }

  const [workerInstances] = useState(() => {
    const workerInstances = U.range(NUM_WORKERS).map(worker)
    workerInstances.forEach(workerInstance =>
      workerInstance.addEventListener('message', onMessage))
    return workerInstances
  })

  useEffect(() => {
    setRunsCompletedCount(0)
    workerResultsRef.current = []

    const workerMessage = {
      K,
      ACTIONS,
      RUNS: RUNS / NUM_WORKERS,
      STEPS,
      experimentsConfig
    }

    workerInstances.forEach((workerInstance, workerIndex) =>
      workerInstance.runExperiments(workerMessage, workerIndex))

    drawDiagrams(experiments, experiments.map(() => ({
      averageRewardsPerStep: [],
      averagePercentOptimalActionsPerStep: []
    })))
  }, [experimentsConfig, experiments, workerInstances])

  return (
    <div className="mainview-layout">
      <div>runsCompletedCount: {runsCompletedCount}</div>
      <div className="chart-wrapper">
        <canvas id="chart1"></canvas>
      </div>
      <div className="chart-wrapper">
        <canvas id="chart2"></canvas>
      </div>
    </div>
  )
}

export default MainView
