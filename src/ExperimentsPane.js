import React, { useEffect, useRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import * as U from './utils'
import './ExperimentsPane.css'

const ExperimentsPane = ({ experimentsConfig, onOk, onCancel }) => {

  const [currentExperimentIndex, setCurrentExperimentIndex] = useState(0)
  const [currentExperiment, setCurrentExperiment] = useState()
  const [actionSelector, setActionSelector] = useState()
  const [stepSizeCalculator, setStepSizeCalculator] = useState()
  const [colour, setColour] = useState()

  useEffect(() => {
    const experimentConfig = experimentsConfig[currentExperimentIndex]
    setCurrentExperiment(experimentsConfig[experimentConfig])
    setActionSelector(experimentConfig.actionSelector[0])
    setStepSizeCalculator(experimentConfig.stepSizeCalculator[0])
    setColour(experimentConfig.colour)
  }, [currentExperimentIndex, experimentsConfig])

  const onSubmit = e => {
    e.preventDefault()
    if (formRef.current && formRef.current.checkValidity()) {
      onOk()
    }
  }

  const formRef = useRef()

  return (
    <Form noValidate validated={true} onSubmit={onSubmit} ref={formRef}>
      <Form.Group>
        <Form.Label size="sm">Experiment</Form.Label>
        <Form.Control as="select" custom size="sm" value={currentExperimentIndex} onChange={e => setCurrentExperimentIndex(Number(e.target.value))}>
          {U.range(experimentsConfig.length).map(n => <option key={n} value={n}>Experiment {n + 1}</option>)}
        </Form.Control>
      </Form.Group>

      <fieldset>
        <Form.Group>
          <Form.Label size="sm">Action Selector</Form.Label>
          <Form.Control as="select" custom size="sm" value={actionSelector}>
            <option value="GreedyActionSelector">Greedy</option>
            <option value="EpsilonGreedyActionSelector">ε-Greedy</option>
            <option value="UCBActionSelector">Upper Confidence Bound</option>
          </Form.Control>
        </Form.Group>

        {actionSelector === 'EpsilonGreedyActionSelector' && (
          <Form.Group>
            <Form.Label size="sm">ε</Form.Label>
            <Form.Control size="sm">
            </Form.Control>
          </Form.Group>
        )}

        {actionSelector === 'UCBActionSelector' && (
          <Form.Group>
            <Form.Label size="sm">c</Form.Label>
            <Form.Control size="sm">
            </Form.Control>
          </Form.Group>
        )}
      </fieldset>

      <fieldset>
        <Form.Group>
          <Form.Label size="sm">Step Size Calculator</Form.Label>
          <Form.Control as="select" custom size="sm" value={stepSizeCalculator}>
            <option value="decayingStepSizeCalculator">Decaying</option>
            <option value="constantStepSizeCalculator">Constant</option>
          </Form.Control>
        </Form.Group>

        {stepSizeCalculator === 'constantStepSizeCalculator' && (
          <Form.Group>
            <Form.Label size="sm">α</Form.Label>
            <Form.Control size="sm">
            </Form.Control>
          </Form.Group>
        )}
      </fieldset>

      <Form.Group>
        <Form.Label size="sm">Colour</Form.Label>
        <Form.Control as="select" custom size="sm" value={colour}>
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="purple">Purple</option>
          <option value="cyan">Cyan</option>
          <option value="grey">Grey</option>
        </Form.Control>
      </Form.Group>

      <div className="experiments-pane__bottom-controls">
        <button variant="primary" type="submit">OK</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </Form>
  )
}

export default ExperimentsPane
