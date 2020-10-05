import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from "react-dom"
import CanvasDraw, { saveableCanvas } from "react-canvas-draw"
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'

const defaultProps = {
  onChange: null,
  loadTimeOffset: 5,
  lazyRadius: 30,
  brushRadius: 12,
  brushColor: "#444",
  catenaryColor: "#0a0302",
  gridColor: "rgba(150,150,150,0.17)",
  hideGrid: false,
  canvasWidth: 400,
  canvasHeight: 400,
  disabled: false,
  saveData: null,
  immediateLoading: false,
  hideInterface: false
}

const ImgProc = (props) => {

  const sendResponse = (ev) => {
    ev.preventDefault()
    const drawing = localStorage.getItem("savedDrawing")
    props.sendResponse(drawing)
  }

  return (
    <>
      <h4 style={{textAlign: 'left'}}>Description</h4>
      <p>{props.requestor.description}</p>
      <h5>Question</h5>
      <p>{props.requestor.imageProcessingQuestion}</p>
      {props.action ?
        (
          <>
            <CanvasDraw
              imgSrc={`data:${props.processingImg.dataType};base64,${props.processingImg.data}`}
              {...defaultProps}
              onChange={(ev) => {
                localStorage.setItem(
                  "savedDrawing",
                  ev.getSaveData()
                )
              }}
              className="mb-3"
            />
            <Button className="m-1" variant="success" type="submit" onClick={sendResponse}>Send Response</Button>
          </>
        ) : (
          <Image
            style={{objectFit: "cover"}}
            src={`data:${props.processingImg.dataType};base64,${props.processingImg.data}`}
            fluid
            className="mt-2 mb-2"
          />
        )
      }
    </>
  )
}

ImgProc.propTypes = {
  requestor: PropTypes.object,
  sendResponse: PropTypes.func,
  action: PropTypes.bool
}

export default ImgProc
