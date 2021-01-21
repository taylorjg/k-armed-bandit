import * as L from './logic'
import * as U from './utils'

export const runExperiments = async (message, workerIndex) => {

  const startTime = performance.now()

  const { experimentsConfig, K, ACTIONS, RUNS, STEPS } = message

  const experiments = experimentsConfig.map(experimentConfig =>
    L.makeExperiment(experimentConfig, ACTIONS))

  const results = experiments.map(() => new L.ExperimentResults(STEPS))

  U.range(RUNS).forEach(run => {
    const n = run + 1
    const testBed = new L.TestBed(K)
    experiments.forEach(experiment => experiment.reset())
    const stepResults = U.range(STEPS).map(step =>
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
