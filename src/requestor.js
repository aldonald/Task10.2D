import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ListGroup from 'react-bootstrap/ListGroup'
import Choice from './choice'
import Decision from './decision'
import Sentence from './sentence'
import ImgProc from './imgproc'
import faker from  'faker'

const Requestor = (props) => {
  const [showModal, setShowModal] = useState(false)
  const [processingImg, setProcessingImg] = useState({})
  const [logoImg, setLogoImg] = useState({})
  const [action, setAction] = useState(false)

  const handleShowModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const arrayBufferToBase64 = (buffer) => {
    var binary = ''
    var bytes = [].slice.call(new Uint8Array(buffer))
    bytes.forEach((b) => binary += String.fromCharCode(b))
    return window.btoa(binary)
  }

  const sendResponse = (response) => {
    let type
    if (props.requestor.choiceQuestion) {
      type = 'choiceQuestion'
    } else if (props.requestor.decisionTaskQuestion) {
      type = 'decisionTaskQuestion'
    } else if (props.requestor.sentenceTaskQuestion) {
      type = 'sentenceTaskQuestion'
    } else if (props.requestor.imageProcessingQuestion) {
      type = 'imageProcessingQuestion'
    }
    const formData = new FormData()
    console.log(`Type is ${type}`)
    formData.append('questionType', type)
    formData.append('response', response)
    formData.append('request', props.requestor._id)

    fetch('/api/taskresponse/', {
      method: 'POST',
      credentials: 'include',
      body: formData
    })
    .then(response => response.json())
    .then(request => {
      document.location.reload()
    })
    .catch((error) => {
      console.error('Error:', error)
    })
  }

  const fetchProcessingImg = () => {
    if (props.requestor.imageProcessingQuestion) {
      const url = `api/imageprocessingimage/${props.requestor._id}`
      fetch(url, {credentials: 'include'})
      .then(response => {
        return response.json()
      })
      .then(response => {
        if (response) {
          const dataType = response.img.contentType
          const data = arrayBufferToBase64(response.img.data.data)
          setProcessingImg({dataType: dataType, data: data})
        }
      })
    }
    if (props.requestor.logo) {
      const url = `/api/userimage/${props.requestor.logo}`
      console.log(url)
      fetch(url, {credentials: 'include'})
      .then(response => {
        return response.json()
      })
      .then(response => {
        if (response) {
          const logoDataType = response.img.contentType
          const logoData = arrayBufferToBase64(response.img.data.data)
          setLogoImg({dataType: logoDataType, data: logoData})
        }
      })
    }
  }

  useEffect(fetchProcessingImg, [])

  let main
  if (props.requestor.choiceQuestion) {
    main = <Choice requestor={props.requestor} sendResponse={sendResponse} logoImg={logoImg} action={action}/>
  } else if (props.requestor.decisionTaskQuestion) {
    main = <Decision requestor={props.requestor} sendResponse={sendResponse} logoImg={logoImg} action={action} />
  } else if (props.requestor.sentenceTaskQuestion) {
    main = <Sentence requestor={props.requestor} sendResponse={sendResponse} logoImg={logoImg} action={action} />
  } else if (props.requestor.imageProcessingQuestion) {
    main = <ImgProc
      requestor={props.requestor}
      sendResponse={sendResponse}
      logoImg={logoImg}
      processingImg={processingImg}
      action={action}
    />
  }

  let masterW = ''
  if (props.masterWorkers) {
    if (props.masterWorkers === "yes") masterW = "Master worker required. "
    else masterW = "Open to all. "
  }

  const addToUser = (ev) => {
    ev.preventDefault()
    const formData = new FormData()
    formData.append('request', props.requestor._id)
    fetch('/api/addtouser/', {
      method: 'POST',
      credentials: 'include',
      body: formData
    })
    .then(_ => setShowModal(false))
    .catch((error) => {
      console.error('Error:', error)
    })
  }

  const removeFromUser = (ev) => {
    ev.preventDefault()
    const formData = new FormData()
    formData.append('request', props.requestor._id)
    fetch('/api/removefromuser/', {
      method: 'POST',
      credentials: 'include',
      body: formData
    })
    .then(_ => {
      setShowModal(false)
      if (props.refresh) props.refresh()
    })
    .catch((error) => {
      console.error('Error:', error)
    })
  }

  return (
    <>
      <div className="col-sm-6 col-md-4 col-lg-3 mb-5">
        <Card className="m-3">
          <Card.Img variant="top" src={
            logoImg.data
            ? `data:${logoImg.dataType};base64,${logoImg.data}`
            : faker.random.image()
          } />
          <Card.Body>
            <Card.Title>{props.requestor.title}</Card.Title>
            <Card.Text>{`${props.requestor.description.slice(0, 85)}...`}</Card.Text>
            <Card.Text>{`${masterW}Amount offered: ${props.requestor.reward}`}</Card.Text>
            <Button variant="outline-dark" onClick={handleShowModal}>View Details</Button>
          </Card.Body>
        </Card>
      </div>

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
        onHide={handleCloseModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.requestor.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="justify-content-end">
            <Col xs={{ span: 5}} style={{textAlign: 'left'}}>
              <Image
                style={{height: "300px", width: "300px", objectFit: "cover"}}
                src={
                  logoImg.data ? `data:${logoImg.dataType};base64,${logoImg.data}` : faker.random.image()
                }
              />
            </Col>
            <Col xs={{ span: 7}} style={{textAlign: 'left'}}>
              {main}
            </Col>
          </Row>
          <Row className="justify-content-end mr-3">
            <p>{`${masterW}Reward offered for the task of ${props.requestor.reward}`}</p>
          </Row>
        </Modal.Body>
        <Modal.Footer>
        {props.inUserList
          ? (
            <Button variant="outline-warning" type="button" onClick={removeFromUser}>
              Remove from my tasks
            </Button>
          )
          : (
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          )}
        {props.inUserList
          ? (
            <Button variant="outline-success" type="button" onClick={() => setAction(true)}>
              Action
            </Button>
          )
          : (<Button variant="primary" type="submit" onClick={addToUser}>
            Add to my tasks
          </Button>)}
        </Modal.Footer>
      </Modal>
    </>
  )

}

Requestor.propTypes = {
  requestor: PropTypes.object,
  inUserList: PropTypes.bool,
  refresh: PropTypes.func
}

export default Requestor
