import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Alert from 'react-bootstrap/Alert'
import TaskType from './tasktype'
import { useHistory } from "react-router-dom"

const NewTask = (props) => {
  const [type, setType] = useState(null)
  const [choiceText, setChoiceText] = useState('')
  const [dropDownChoice, setDropDownChoice] = useState({})
  const [choiceOptions, setChoiceOptions] = useState(0)
  const [decisionText, setDecisionText] = useState('')
  const [sentenceText, setSentenceText] = useState('')
  const [imageProcessingText, setImageProcessingText] = useState('')
  const [processingFile, setProcessingFile] = useState({})

  const history = useHistory()

  const selectType = (ev) => {
    setType(ev.target.value)
  }

  const handleSetProcessingFile = file => {
    setProcessingFile(file)
  }

  const addTextToChoice = (value) => setChoiceText(value)
  const addTextToDecision = (value) => setDecisionText(value)
  const addTextToSentence = (value) => setSentenceText(value)
  const addTextToImageProcessing = (value) => setImageProcessingText(value)
  const setOptions = (value) => setChoiceOptions(value)
  const changeDropDownChoices = (dict) => setDropDownChoice(dict)

  const arrayBufferToBase64 = (buffer) => {
    var binary = ''
    var bytes = [].slice.call(new Uint8Array(buffer))
    bytes.forEach((b) => binary += String.fromCharCode(b))
    return window.btoa(binary)
  }

  const submitProcessingImage = (requestId) => {
    const formData = new FormData()
    formData.append('image', processingFile)
    formData.append('request', requestId)
    fetch('/api/imageprocessingimage/', {
      method: 'POST',
      credentials: 'include',
      body: formData
    })
    .then(_ => history.push("/"))
    .catch((error) => {
      console.error('Error:', error)
    })
  }

  const submitForm = (ev) => {
    ev.preventDefault()
    const listOfOptions = []
    for (var i = 0; i < choiceOptions; i++) {
      listOfOptions.push(dropDownChoice[`choiceTask-${i}`])
    }

    const formData = new FormData()

    formData.append('taskTypeSelect', ev.target.taskTypeSelect.value)
    formData.append('title', ev.target.taskTitle.value)
    formData.append('description', ev.target.taskDescription.value)
    formData.append('expiry', ev.target.taskExpiry.value)
    formData.append('choiceQuestion', choiceText)
    formData.append('choiceOptions', listOfOptions)
    formData.append('decisionTaskQuestion', decisionText)
    formData.append('sentenceTaskQuestion', sentenceText)
    formData.append('imageProcessingQuestion', imageProcessingText)
    formData.append('masterWorkers', ev.target.masterWorkers.value)
    formData.append('reward', ev.target.reward.value)
    formData.append('workerNumbers', ev.target.workerNumbers.value)

    fetch('/api/newtask/', {
      method: 'POST',
      credentials: 'include',
      body: formData
    })
    .then(response => response.json())
    .then(request => {
      if (type === 'imageProcessingTask') {
        submitProcessingImage(request._id)
      }
      history.push("/")
    })
    .catch((error) => {
      console.error('Error:', error)
    })
  }

  const typeradios = [
    {name: 'Choice Task', value: 'choiceTask'},
    {name: 'Decision-Making Task', value: 'decisionTask'},
    {name: 'Sentence-Level Task', value: 'sentenceTask'},
    {name: 'Image Processing Task', value: 'imageProcessingTask'}
  ]

  const describeTaskFields = [
    {name: 'Title', value: 'taskTitle'},
    {name: 'Description', value: 'taskDescription'},
    {name: 'Expiry Date', value: 'taskExpiry'}
  ]

  return (
    <>
      <div className="mt-5"></div>
      <Container>
        <Form style={{marginTop: '80px'}} onSubmit={submitForm}>
          <Alert variant="secondary">
            <Row>
              <p className="ml-3 mr-auto mt-0 mb-0" style={{fontSize: '130%', fontWeight: 'heavy'}}><strong>New Requester Task</strong></p>
              <p className="mr-3 mt-1 mb-0">Worker Task</p>
            </Row>
          </Alert>
          <div key="task-type-choice" className="mb-3" style={{justifyContent: 'space-around', display: 'flex'}} onChange={selectType}>
            {typeradios.map((radioType) => (
              <Form.Check
                inline
                key={`task-type-${radioType.value}`}
                label={radioType.name}
                type="radio"
                id={`task-type-${radioType.value}`}
                name="taskTypeSelect"
                value={radioType.value}
              />
            ))}
          </div>
          <Alert variant="secondary" className="mt-5">
            <p className="mt-0 mb-0" style={{fontSize: '130%', fontWeight: 'heavy'}}><strong>Describe Your Task To Workers</strong></p>
          </Alert>
          {describeTaskFields.map((description) => (
            <Form.Group as={Row} controlId={description.value} key={`describeTaskFields-${description.value}`}>
              <Form.Label column sm="3">
                {description.name}
              </Form.Label>
              <Col sm="9">
                <Form.Control type="text" name={description.value} />
              </Col>
            </Form.Group>
          ))}
          <Alert variant="secondary" className="mt-5">
            <p className="mt-0 mb-0" style={{fontSize: '130%', fontWeight: 'heavy'}}><strong>Setting up your Task</strong></p>
          </Alert>
          <TaskType
            type={type}
            addTextToChoice={addTextToChoice}
            addTextToDecision={addTextToDecision}
            addTextToSentence={addTextToSentence}
            addTextToImageProcessing={addTextToImageProcessing}
            changeDropDownChoices={changeDropDownChoices}
            setOptions={setOptions}
            setProcessingFile={handleSetProcessingFile}
          />
          <Alert variant="secondary" className="mt-5">
            <p className="mt-0 mb-0" style={{fontSize: '130%', fontWeight: 'heavy'}}><strong>Worker Requirement</strong></p>
          </Alert>
          <Form.Group as={Row} key="master-worker-choice" controlId="masterWorkers" className="mb-3" style={{justifyContent: "space-between"}}>
            <Form.Label column sm="3">
              Require Master Workers
            </Form.Label>
            <Col sm="9">
              <Form.Check inline label="Yes" type="radio" id="master-workers-yes" name="masterWorkers" className="mr-5" value="yes"/>
              <Form.Check inline label="No" type="radio" id="master-workers-no" name="masterWorkers" value="no"/>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="rewardRow">
            <Form.Label column sm="3">
              Reward per response
            </Form.Label>
            <Col sm="9">
              <Form.Control type="text" name="reward" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="numberOfWorkers">
            <Form.Label column sm="3">
              Number of workers
            </Form.Label>
            <Col sm="9">
              <Form.Control type="text" name="workerNumbers" />
            </Col>
          </Form.Group>
          <Button variant="primary" type="submit" size="lg" block className="mb-5">
            Save
          </Button>
        </Form>
      </Container>
    </>
  )
}

export default NewTask
