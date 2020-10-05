import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Sentence = (props) => {
  const [responseText, setResponseText] = useState('')

  const sendResponse = (ev) => {
    ev.preventDefault()
    props.sendResponse(responseText)
  }

  return (
    <>
      <h4 style={{textAlign: 'left'}}>Description</h4>
      <p>{props.requestor.description}</p>
      <h5>Question</h5>
      <p>{props.requestor.sentenceTaskQuestion}</p>
      {props.action &&
        (
          <Form className="mb-3">
            <Form.Group controlId="sentenceTaskQuestion">
              <Form.Label>Add your response</Form.Label>
              <Form.Control
                as="textarea"
                rows={15}
                name="sentenceTaskQuestion"
                onChange={(ev) => setResponseText(ev.target.value)}
                value={responseText}
              />
            </Form.Group>
            <Button className="m-1" variant="success" type="submit" onClick={sendResponse}>Send Response</Button>
          </Form>
        )}
    </>
  )
}

Sentence.propTypes = {
  requestor: PropTypes.object,
  sendResponse: PropTypes.func,
  action: PropTypes.bool
}

export default Sentence
