import React, { useRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import * as C from './constants'
import * as U from './utils'
import './SettingsPane.css'

const SettingsPane = ({ settings, onOk, onCancel }) => {

  const [values, setValues] = useState({
    webWorkers: U.clamp(C.MIN_WEB_WORKERS, C.MAX_WEB_WORKERS, settings.webWorkers),
    k: U.clamp(C.MIN_K, C.MAX_K, settings.k),
    runs: U.clamp(C.MIN_RUNS, C.MAX_RUNS, settings.runs),
    steps: U.clamp(C.MIN_STEPS, C.MAX_STEPS, settings.steps)
  })

  const onChangeValue = propertyName => e => {
    const valueNumber = Number(e.target.value)
    const value = Number.isInteger(valueNumber) && valueNumber > 0 ? valueNumber : ''
    setValues(values => ({ ...values, [propertyName]: value }))
  }

  const onSubmit = e => {
    e.preventDefault()
    if (formRef.current && formRef.current.checkValidity()) {
      onOk(values)
    }
  }

  const formRef = useRef()

  return (
    <Form noValidate validated={true} onSubmit={onSubmit} ref={formRef}>
      <Form.Group>
        <Form.Label size="sm">Web Workers</Form.Label>
        <Form.Control as="select" custom size="sm" value={values.webWorkers} onChange={onChangeValue('webWorkers')}>
          {U.range(C.MAX_WEB_WORKERS).map((n => n + 1)).map(n => <option key={n} value={n}>{n}</option>)}
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label size="sm">Arms (k)</Form.Label>
        <Form.Control as="select" custom size="sm" value={values.k} onChange={onChangeValue('k')}>
          {U.range(C.MAX_K - C.MIN_K + 1).map((n => n + C.MIN_K)).map(n => <option key={n} value={n}>{n}</option>)}
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label size="sm">Runs</Form.Label>
        <Form.Control
          size="sm"
          required
          type="number"
          min={C.MIN_RUNS}
          max={C.MAX_RUNS}
          value={values.runs}
          onChange={onChangeValue('runs')}
        />
        <Form.Control.Feedback type="invalid">
          Must be a number between {C.MIN_RUNS} and {C.MAX_RUNS}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Label size="sm">Steps</Form.Label>
        <Form.Control
          size="sm"
          required
          type="number"
          min={C.MIN_STEPS}
          max={C.MAX_STEPS}
          value={values.steps}
          onChange={onChangeValue('steps')}
        />
        <Form.Control.Feedback type="invalid">
          Must be a number between {C.MIN_STEPS} and {C.MAX_STEPS}
        </Form.Control.Feedback>
      </Form.Group>

      <div className="settings-pane__bottom-controls">
        <button variant="primary" type="submit">OK</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </Form>
  )
}

export default SettingsPane
