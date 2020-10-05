import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Form from 'react-bootstrap/Form'


const Decision = (props) => {
  const [decision, setDecision] = useState('')

  const sendResponse = (ev) => {
    ev.preventDefault()
    props.sendResponse(decision)
  }

  return (
    (
      <>
        <Form>
          <h4 style={{textAlign: 'left'}}>Description</h4>
          <p>{props.requestor.description}</p>
          <h5>Question</h5>
          <p>{props.requestor.decisionTaskQuestion}</p>
          {props.action &&
            (
              <>
                <ButtonGroup toggle style={{display: 'block'}}>
                {['True', 'Undecided', 'False'].map((value, idx) => (
                  <ToggleButton
                    key={`decisionTask-${idx}`}
                    type="radio"
                    variant="secondary"
                    name="radio"
                    value={value.toLowerCase()}
                    checked={decision === value.toLowerCase()}
                    onChange={(e) => setDecision(e.currentTarget.value)}
                  >
                    {value}
                  </ToggleButton>
                ))}
                </ButtonGroup>
                <Button className="m-1 mb-3" variant="success" type="submit" onClick={sendResponse}>Send Response</Button>
              </>
            )
          }
        </Form>
      </>
    )
  )
}

Decision.propTypes = {
  requestor: PropTypes.object,
  sendResponse: PropTypes.func,
  action: PropTypes.bool
}

export default Decision
