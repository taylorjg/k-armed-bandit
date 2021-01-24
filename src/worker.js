import * as L from './logic'
import * as U from './utils'

export const runExperiments = (message, workerIndex) => {

  const startTime = performance.now()

  const { k, runs, steps, experimentsConfig } = message

  const experiments = experimentsConfig.map(experimentConfig =>
    L.makeExperiment(experimentConfig, U.range(k)))

  const results = experiments.map(() => new L.ExperimentResults(steps))

  U.range(runs).forEach(run => {
    const n = run + 1
    const testBed = new L.TestBed(k)
    experiments.forEach(experiment => experiment.reset())
    const stepResults = U.range(steps).map(step =>
      experiments.map(experiment => L.bandit(testBed, experiment, step + 1)))
    stepResults.forEach((stepResult, step) => {
      stepResult.forEach(({ reward, isOptimal }, experimentIndex) => {
        results[experimentIndex].update(step, n, reward, isOptimal)
      })
    })
    postMessage({ type: 'runExperimentsRunCompleted', workerIndex })
  })

  postMessage({
    type: 'runExperimentsResults',
    workerIndex,
    results: results.map(({
      runningAverageReward,
      runningAveragePercentOptimalAction
    }) => ({
      averageRewards: runningAverageReward,
      averagePercentOptimalActions: runningAveragePercentOptimalAction
    }))
  })

  const endTime = performance.now()
  const elapsedTime = endTime - startTime
  console.log(`worker[${workerIndex}] elapsedTime: ${elapsedTime}`)
}
