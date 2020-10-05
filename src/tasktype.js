import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import DropdownButton from 'react-bootstrap/DropdownButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import ToggleButton from 'react-bootstrap/ToggleButton'

const TaskType = (props) => {
  const [noRows, setNoRows] = useState(0)
  const [dropDownChoice, setDropDownChoices] = useState({})
  const [sentenceText, setSentenceText] = useState('')
  const [decisionText, setDecisionText] = useState('')
  const [choiceText, setChoiceText] = useState('')
  const [imageProcessingText, setImageProcessingText] = useState('')
  const [fileName, setFileName] = useState('Add image for worker')

  const handleSetRows = (ev) => {
    setNoRows(ev)
    props.setOptions(ev)
  }

  const changeDropDownChoices = (ev) => {
    const temp = {}
    temp[ev.target.name] = ev.target.value
    setDropDownChoices(dropDownChoice => {return {...dropDownChoice, ...temp}})
    props.changeDropDownChoices(dropDownChoice => {return {...dropDownChoice, ...temp}})
  }

  const addTextToSentence = (ev) => {
    setSentenceText(ev.target.value)
    props.addTextToSentence(ev.target.value)
  }

  const addTextToDecision = (ev) => {
    setDecisionText(ev.target.value)
    props.addTextToDecision(ev.target.value)
  }

  const addTextToChoice = (ev) => {
    setChoiceText(ev.target.value)
    props.addTextToChoice(ev.target.value)
  }

  const addTextToImageProcessing = (ev) => {
    setImageProcessingText(ev.target.value)
    props.addTextToImageProcessing(ev.target.value)
  }

  const onProcFileChange = e => {
    props.setProcessingFile(e.target.files[0])
    setFileName(e.target.files[0].name)
  }


  let taskRender
  if (props.type === 'choiceTask') {
    const formEls = []
    for (let i = 0; i < noRows; i++) formEls.push(i)

    taskRender = (
      <>
        <Form.Group controlId="choiceTask.question">
          <Form.Label>Question</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="Type in the worker's question"
            value={choiceText || ''}
            onChange={addTextToChoice}
            name="choiceTask.question"/>
        </Form.Group>
        <DropdownButton
          as={ButtonGroup}
          key="down"
          id="dropdown-button-drop-down"
          drop="down"
          variant="secondary"
          title="Select number of options"
          onSelect={handleSetRows}
        >
          <Dropdown.Item eventKey="1">1</Dropdown.Item>
          <Dropdown.Item eventKey="2">2</Dropdown.Item>
          <Dropdown.Item eventKey="3">3</Dropdown.Item>
          <Dropdown.Item eventKey="4">4</Dropdown.Item>
          <Dropdown.Item eventKey="5">5</Dropdown.Item>
          <Dropdown.Item eventKey="6">6</Dropdown.Item>
          <Dropdown.Item eventKey="7">7</Dropdown.Item>
          <Dropdown.Item eventKey="8">8</Dropdown.Item>
        </DropdownButton>
        {formEls.map((_, idx) => {
          return (
            <Form.Row className="mt-3" key={`choice-option-${idx}`}>
              <Form.Label column lg={3}>
                Option
              </Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Type in the worker's option"
                  value={dropDownChoice[`choiceTask-${idx}`] || ''}
                  onChange={changeDropDownChoices}
                  name={`choiceTask-${idx}`}/>
              </Col>
            </Form.Row>
          )
        })}
      </>
    )
  } else if (props.type === 'decisionTask') {
    taskRender = (
      <>
        <Form.Group controlId="decisionTask">
          <Form.Label>Question</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="Type in the true or false question"
            onChange={addTextToDecision}
            name="decisionTask"
            value={decisionText || ''}
          />
        </Form.Group>
      </>
    )
  } else if (props.type === 'sentenceTask') {
    taskRender = (
      <>
        <Form.Group controlId="sentenceTask">
          <Form.Label>Question</Form.Label>
          <Form.Control
            as="textarea"
            rows="5"
            placeholder="Type in the sentence question"
            onChange={addTextToSentence}
            name="sentenceTask"
            value={sentenceText || ''}
          />
        </Form.Group>
      </>
    )
  } else if (props.type === 'imageProcessingTask') {
    taskRender = (
      <>
        <Form.Group controlId="imageProcessingTask">
          <Form.Label>Question</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="Type in the items you wish the user to tag."
            onChange={addTextToImageProcessing}
            name="imageProcessingTask"
            value={imageProcessingText || ''}
          />
          <Form.File
            id="imageProcFile"
            label={fileName}
            custom
            onChange={onProcFileChange}
            className="mt-3"
          />
        </Form.Group>
      </>
    )
  }
  return (
    <>
      {props.type ?
        taskRender
        : <h5 style={{display: 'block', textAlign: 'center'}}>Please select a task type to begin setting up your task.</h5>
      }
    </>
  )
}

TaskType.propTypes = {
  type: PropTypes.string,
  addTextToChoice: PropTypes.func,
  addTextToDecision: PropTypes.func,
  addTextToSentence: PropTypes.func,
  changeDropDownChoices: PropTypes.func,
  setOptions: PropTypes.func,
  injectProcessingImage: PropTypes.func
}

export default TaskType
