import React, { useState, useEffect } from 'react'
import ImageUploader from 'react-images-upload'
import PropTypes from 'prop-types'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import faker from  'faker'

const HeadImg = (props) => {
  const [userImg, setUserImg] = useState({})

  const arrayBufferToBase64 = (buffer) => {
    var binary = ''
    var bytes = [].slice.call(new Uint8Array(buffer))
    bytes.forEach((b) => binary += String.fromCharCode(b))
    return window.btoa(binary)
  }

  const fetchHeadImage = () => {
    const url = `api/userimage/`
    fetch('/api/userimage/', {
      credentials: 'include'
    })
    .then(response => response.json())
    .then(response => {
      const dataType = response.img.contentType
      const data = arrayBufferToBase64(response.img.data.data)
      setUserImg({dataType: dataType, data: data})
    })
  }

  useEffect(fetchHeadImage, [])

  return (
    <Image
      style={{maxHeight: "400px", width: "100%", objectFit: "cover"}}
      src={
        userImg.data ? `data:${userImg.dataType};base64,${userImg.data}` : faker.image.cats()
      }
      fluid
      className="mt-5"
    />
  )

}

export default HeadImg
