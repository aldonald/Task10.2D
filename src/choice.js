import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'

const Choice = (props) => {

  const sendResponse = (ev) => {
    ev.preventDefault()
    props.sendResponse(ev.target.value)
  }

  return (
    <>
      <h4 style={{textAlign: 'left'}}>Description</h4>
      <p>{props.requestor.description}</p>
      <h5>Question</h5>
      <p>{props.requestor.choiceQuestion}</p>
      <h5>Options</h5>
      <ListGroup className="mb-3">
        {props.action ?
          props.requestor.choiceOptions.map((choice, idx) =>
            <Button key={`choice-${idx}`} variant="outline-dark" size="lg" value={idx} onClick={sendResponse}>{choice}</Button>)
        : props.requestor.choiceOptions.map((choice, idx) =>
          <ListGroup.Item key={`options-${idx}`}>{choice}</ListGroup.Item>
        )}
      </ListGroup>
    </>
  )
}

Choice.propTypes = {
  requestor: PropTypes.object,
  sendResponse: PropTypes.func,
  action: PropTypes.bool
}

export default Choice
