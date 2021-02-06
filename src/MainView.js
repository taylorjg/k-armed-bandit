import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ProgressBar } from 'react-bootstrap'
import SlidingPane from 'react-sliding-pane'
import { useCallbackWrapper } from './customHooks'
import SettingsPane from './SettingsPane'
import ExperimentsPane from './ExperimentsPane'
import * as C from './constants'
import * as D from './diagrams'
import * as L from './logic'
import * as U from './utils'
import { AiOutlineSetting, AiTwotoneExperiment } from 'react-icons/ai'
import './MainView.css'
import 'react-sliding-pane/dist/react-sliding-pane.css'

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

const MainView = () => {

  const [settings, setSettings] = useState({
    webWorkers: C.INITIAL_WEB_WORKERS,
    k: C.INITIAL_K,
    runs: C.INITIAL_RUNS,
    steps: C.INITIAL_STEPS
  })

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

  // We only create 'experiments' here because we want to read 'name' and
  // 'colour' later inside 'drawDiagrams'. Ideally, find a way to get rid.
  // Ideally, we'd pass 'experimentsConfig' instead of 'experiments' to 'drawDiagrams'.
  const [experiments] = useState(() =>
    experimentsConfig.map(experimentConfig =>
      L.makeExperiment(experimentConfig, U.range(settings.k))))

  const workerResultsRef = useRef([])

  const [runsCompletedCount, setRunsCompletedCount] = useState(0)
  const [workersCompletedCount, setWorkersCompletedCount] = useState(0)
  const [running, setRunning] = useState(false)

  const onMessage = message => {
    switch (message.data.type) {

      case 'runExperimentsRunCompleted':
        setRunsCompletedCount(count => count + 1)
        break

      case 'runExperimentsResults':
        setWorkersCompletedCount(count => count + 1)
        workerResultsRef.current.push(message.data.results)
        break

      case 'RPC':
      default:
        return
    }
  }

  useEffect(() => {
    if (runsCompletedCount === settings.runs && workersCompletedCount === settings.webWorkers) {
      const finalResults = combineWorkerResults(workerResultsRef.current)
      drawDiagrams(experiments, finalResults)
      setRunning(false)
    }
  }, [settings, experiments, runsCompletedCount, workersCompletedCount])

  const onMessageCallbackWrapper = useCallbackWrapper(onMessage)

  const [workerInstances] = useState(() => {
    const workerInstances = U.range(C.MAX_WEB_WORKERS).map(worker)
    workerInstances.forEach(workerInstance =>
      workerInstance.addEventListener('message', onMessageCallbackWrapper))
    return workerInstances
  })

  const run = useCallback(() => {
    setRunning(true)
    setRunsCompletedCount(0)
    setWorkersCompletedCount(0)
    workerResultsRef.current = []

    const normalWorkerRuns = Math.floor(settings.runs / settings.webWorkers)
    const lastWorkerRuns = settings.runs - (settings.webWorkers - 1) * normalWorkerRuns

    const lastWorkerIndex = settings.webWorkers - 1

    U.range(settings.webWorkers).forEach(workerIndex => {
      const workerInstance = workerInstances[workerIndex]
      const workerRuns = workerIndex === lastWorkerIndex ? lastWorkerRuns : normalWorkerRuns
      const workerMessage = {
        k: settings.k,
        runs: workerRuns,
        steps: settings.steps,
        experimentsConfig
      }
      workerInstance.runExperiments(workerMessage, workerIndex)
    })

    drawDiagrams(experiments, experiments.map(() => ({
      averageRewardsPerStep: [],
      averagePercentOptimalActionsPerStep: []
    })))
  }, [settings, experimentsConfig, experiments, workerInstances])

  useEffect(run, [run])

  const onRun = () => run()

  const [settingsPaneIsOpen, setSettingsPaneIsOpen] = useState(false)

  const openSettingsPane = () => {
    setSettingsPaneIsOpen(true)
  }

  const closeSettingsPane = () => {
    setSettingsPaneIsOpen(false)
  }

  const onSettingsPaneOk = values => {
    setSettings(values)
    closeSettingsPane()
  }

  const onSettingsPaneCancel = () => {
    closeSettingsPane()
  }

  const [experimentsPaneIsOpen, setExperimentsPaneIsOpen] = useState(false)

  const openExperimentsPane = () => {
    setExperimentsPaneIsOpen(true)
  }

  const closeExperimentsPane = () => {
    setExperimentsPaneIsOpen(false)
  }

  const onExperimentsPaneOk = values => {
    closeExperimentsPane()
  }

  const onExperimentsPaneCancel = () => {
    closeExperimentsPane()
  }

  return (
    <div className="mainview-layout">
      <div className="controls">
        <span>Runs completed:</span>
        <ProgressBar min={0} max={settings.runs} now={runsCompletedCount} />
        <button onClick={onRun} disabled={running}>Run</button>
        <button onClick={openSettingsPane} disabled={running}>
          <AiOutlineSetting />
        </button>
        <button onClick={openExperimentsPane} disabled={running}>
          <AiTwotoneExperiment />
        </button>
      </div>
      <div className="chart-wrapper">
        <canvas id="chart1"></canvas>
      </div>
      <div className="chart-wrapper">
        <canvas id="chart2"></canvas>
      </div>
      <SlidingPane
        from="left"
        title="Settings"
        width="300px"
        isOpen={settingsPaneIsOpen}
        onRequestClose={closeSettingsPane}
      >
        <SettingsPane
          settings={settings}
          onOk={onSettingsPaneOk}
          onCancel={onSettingsPaneCancel}
        />
      </SlidingPane>
      <SlidingPane
        from="left"
        title="Experiments"
        width="300px"
        isOpen={experimentsPaneIsOpen}
        onRequestClose={closeExperimentsPane}
      >
        <ExperimentsPane
          experimentsConfig={experimentsConfig}
          onOk={onExperimentsPaneOk}
          onCancel={onExperimentsPaneCancel}
        />
      </SlidingPane>
    </div>
  )
}

export default MainView
