import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const ChangeLogo = () => {
  const [show, setShow] = useState(false)
  const [file, setFile] = useState({})
  const [fileName, setFileName] = useState('Update image')

  const history = useHistory()

  const onFileChange = e => {
    setFile(e.target.files[0])
    setFileName(e.target.files[0].name)
  }

  const onFileSubmit = e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('image', file)
    fetch('/api/userimage/', {
      method: 'POST',
      credentials: 'include',
      body: formData
    })
    .then(response => response.json())
    .then(response => {
      window.location.href = `${window.location.origin}/`
    })
    .catch((error) => {
      console.error('Error:', error)
    })
  }

  const handleShow = (ev) => {
    ev.preventDefault()
    setShow(true)
  }

  const handleClose = () => {
    setShow(false)
  }

  return (
    <>
      <NavDropdown.Item href="/" onClick={handleShow}>Update Logo</NavDropdown.Item>

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Form onSubmit={onFileSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add Photo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.File
              id="imageFile"
              label={fileName}
              custom
              onChange={onFileChange}
            />

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={handleClose}>
              Update image
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default ChangeLogo
