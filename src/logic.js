import random from 'random'
import * as U from './utils'

export class GreedyActionSelector {
  get name() {
    return 'greedy'
  }

  selectAction(_actions, _ns, qs, _t) {
    return U.argmax(qs)
  }
}

export class EpsilonGreedyActionSelector {
  constructor(epsilon) {
    this.epsilon = epsilon
  }

  get name() {
    return `ε-greedy, ε = ${this.epsilon}`
  }

  selectAction(actions, _ns, qs, _t) {
    return Math.random() < this.epsilon
      ? U.randomChoice(actions)
      : U.argmax(qs)
  }
}

export class UCBActionSelector {
  constructor(c) {
    this.c = c
  }

  get name() {
    return `UCB, c = ${this.c}`
  }

  selectAction(_actions, ns, qs, t) {
    return U.argmax(this.ucb(ns, qs, t))
  }

  ucb(ns, qs, t) {
    return qs.map((q, index) => {
      const n = ns[index]
      if (n === 0) return Number.MAX_VALUE
      return q + this.c * Math.sqrt(Math.log(t) / n)
    })
  }
}

export const constantStepSizeCalculator = stepSize => _n => stepSize
export const decayingStepSizeCalculator = n => 1 / n

export class Experiment {
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

  update(action, reward) {
    const n = this.ns[action] + 1
    this.ns[action] = n
    const oldEstimate = this.qs[action]
    const alpha = this.stepSizeCalculator(n)
    const newEstimate = oldEstimate + alpha * (reward - oldEstimate)
    this.qs[action] = newEstimate
  }
}

export class ExperimentResults {
  constructor(steps) {
    this.steps = steps
    this.reset()
  }

  reset() {
    this.runningAverageReward = Array(this.steps).fill(0)
    this.runningAveragePercentOptimalAction = Array(this.steps).fill(0)
  }

  update(step, n, reward, isOptimal) {
    this.updateRunningAverageReward(step, n, reward)
    this.updateRunningAveragePercentOptimalAction(step, n, isOptimal)
  }

  updateRunningAverageReward(step, n, reward,) {
    const oldAverage = this.runningAverageReward[step]
    const newAverage = oldAverage + (1 / n) * (reward - oldAverage)
    this.runningAverageReward[step] = newAverage
  }

  updateRunningAveragePercentOptimalAction(step, n, isOptimal,) {
    const percentOptimalAction = isOptimal ? 100 : 0
    const oldAverage = this.runningAveragePercentOptimalAction[step]
    const newAverage = oldAverage + (1 / n) * (percentOptimalAction - oldAverage)
    this.runningAveragePercentOptimalAction[step] = newAverage
  }
}

export class TestBed {
  constructor(k) {
    this.armDistributions = TestBed.makeArmDistributions(k)
    const trueValues = this.armDistributions.map(({ trueValue }) => trueValue)
    this.optimalArm = U.argmax(trueValues)
  }

  static makeArmDistributions(k) {
    const trueValues = TestBed.makeTrueValues(k)
    const armDistributions = trueValues.map((trueValue, arm) => {
      const mean = trueValue
      const variance = 1
      const normal = random.normal(mean, variance)
      return { arm, trueValue, normal }
    })
    return armDistributions
  }

  static makeTrueValues(k) {
    const mean = 0
    const variance = 1
    const normal = random.normal(mean, variance)
    const trueValues = U.range(k).map(normal)
    return trueValues
  }
}

export const bandit = (testBed, experiment, t) => {
  const arm = experiment.actionSelector.selectAction(
    experiment.actions,
    experiment.ns,
    experiment.qs,
    t)
  const reward = testBed.armDistributions[arm].normal()
  experiment.update(arm, reward)
  const isOptimal = arm === testBed.optimalArm
  return { reward, isOptimal }
}

export const makeActionSelector = experimentConfig => {
  const [actionSelectorName, ...args] = experimentConfig.actionSelector
  switch (actionSelectorName) {
    case 'GreedyActionSelector': return new GreedyActionSelector(...args)
    case 'EpsilonGreedyActionSelector': return new EpsilonGreedyActionSelector(...args)
    case 'UCBActionSelector': return new UCBActionSelector(...args)
    default: throw new Error(`Unexpected actionSelectorName, "${actionSelectorName}"`)
  }
}

export const makeStepSizeCalculator = experimentConfig => {
  const [stepSizeCalculatorName, ...args] = experimentConfig.stepSizeCalculator
  switch (stepSizeCalculatorName) {
    case 'decayingStepSizeCalculator': return decayingStepSizeCalculator
    case 'constantStepSizeCalculator': return constantStepSizeCalculator(...args)
    default: throw new Error(`Unexpected stepSizeCalculatorName, "${stepSizeCalculatorName}"`)
  }
}

export const makeExperiment = (experimentConfig, actions) =>
  new Experiment(
    actions,
    makeActionSelector(experimentConfig),
    makeStepSizeCalculator(experimentConfig),
    experimentConfig.colour,
    experimentConfig.initialValue)
