import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import * as U from './utils'
import './SettingsPane.css'

const SettingsPane = ({ settings, onOk, onCancel }) => {

  const [values, setValues] = useState(settings)

  const onChange = propertyName => e => {
    setValues(values => ({ ...values, [propertyName]: Number(e.target.value) }))
  }

  const onSubmit = e => {
    e.preventDefault()
    onOk(values)
  }

  return (
    <Form onSubmit={onSubmit}>
      {/* <Form.Group>
        <Form.Label size="sm">Web Workers</Form.Label>
        <Form.Control type="number" size="sm" value={values.webWorkers} onChange={onChange('webWorkers')} />
      </Form.Group> */}

      <Form.Group>
        <Form.Label size="sm">Web Workers</Form.Label>
        <Form.Control as="select" size="sm" value={values.webWorkers} onChange={onChange('webWorkers')}>
          {U.range(8).map((n => n + 1)).map(n => <option key={n} value={n}>{n}</option>)}
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label size="sm">Arms (k)</Form.Label>
        <Form.Control as="select" size="sm" value={values.k} onChange={onChange('k')}>
          {U.range(9).map((n => n + 2)).map(n => <option key={n} value={n}>{n}</option>)}
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label size="sm">Runs</Form.Label>
        <Form.Control type="number" size="sm" value={values.runs} onChange={onChange('runs')} />
      </Form.Group>

      <Form.Group>
        <Form.Label size="sm">Steps</Form.Label>
        <Form.Control type="number" size="sm" value={values.steps} onChange={onChange('steps')} />
      </Form.Group>

      <div className="basic-config__controls">
        <button variant="primary" type="submit">OK</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </Form>
  )
}

export default SettingsPane
