import * as L from './logic'
import * as U from './utils'

const runExperiments = (testBed, experiments, steps) => {
  experiments.forEach(experiment => experiment.reset())
  return U.range(steps).map(step =>
    experiments.map(experiment => L.bandit(testBed, experiment, step + 1))
  )
}

export const fred = async message => {

  const startTime = performance.now()

  const { experimentsConfig, K, ACTIONS, RUNS, STEPS, workerIndex } = message
  const experiments = experimentsConfig.map(experimentConfig => L.makeExperiment(experimentConfig, ACTIONS))

  const results = experiments.map(() => new L.ExperimentResults(STEPS))

  U.range(RUNS).forEach(run => {
    const n = run + 1
    const testBed = new L.TestBed(K)
    const stepResults = runExperiments(testBed, experiments, STEPS)
    stepResults.forEach((stepResult, step) => {
      stepResult.forEach(({ reward, isOptimal }, experimentIndex) => {
        results[experimentIndex].update(step, n, reward, isOptimal)
      })
    })
    postMessage({ type: 'fredRun', workerIndex })
  })

  postMessage({
    type: 'fredResults',
    workerIndex,
    results: results.map(({
      runningAverageReward,
      runningAveragePercentOptimalAction
    }) => ({
      runningAverageReward,
      runningAveragePercentOptimalAction
    }))
  })

  const endTime = performance.now()
  const elapsedTime = endTime - startTime
  console.log(`worker[${workerIndex}] elapsedTime: ${elapsedTime}`)
}
