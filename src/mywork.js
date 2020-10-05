import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import MyFilter from './filter'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Requestor from './requestor'
import { useHistory } from "react-router-dom"

const MyWork = () => {
  const [myWorkList, setMyWorkList] = useState([])
  const [filteredList, setFilteredList] = useState([])
  const [allCards, setAllCards] = useState([])
  const [filteredAllCards, setFilteredAllCards] = useState([])
  const [loading, setLoading] = useState(true)
  const [showFullList, setShowFullList] = useState(false)

  const history = useHistory()

  const fetchCards = () => {
    const url = `/api/requestors/foruser`
    fetch(url).then(response => {
      return response.json()}
    ).then(response => {
      setMyWorkList(response)
      setFilteredList(response)
    }).finally(() => setLoading(false))
  }

  const refresh = () => document.location.reload()

  let workListDisplay
  if (myWorkList.length > 0) {
    workListDisplay = filteredList.map((workItem, i) => (
      <Requestor
        key={`workItem-${i}`}
        requestor={workItem}
        inUserList
        refresh={refresh}
      />
    )
  )} else {
    workListDisplay = <p>No work currently selected</p>
  }

  const fetchAllCards = () => {
    const url = `/api/requestors/`
    fetch(url).then(response =>
      response.json()
    ).then(response => {
      setAllCards(response)
      setFilteredAllCards(response)
    }).finally(() => {
      setLoading(false)
      setShowFullList(true)
    })
  }

  const addTasks = () => {
    fetchAllCards()
  }

  const filterJobs = (jobs) => {
    setFilteredList(jobs)
  }

  const filterAllCards = (jobs) => {
    setFilteredAllCards(jobs)
  }

  useEffect(fetchCards, [])

  return (
    <>
      <Container className="mt-5">
        <Row className="mb-5" style={{alignItems: 'flex-end'}}>
          <h2 className="mt-5 mb-0">Work I have selected</h2>
          <MyFilter returnResults={filterJobs} workList={myWorkList} />
        </Row>
        <Button variant="outline-info" size="lg" block onClick={addTasks} className="mb-5">
          Add more tasks
        </Button>
        <Row>
          {workListDisplay}
        </Row>
      </Container>
      <Modal
        show={showFullList}
        onHide={() => setShowFullList(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton onHide={refresh}>
          <Modal.Title id="example-custom-modal-styling-title">
            <Row className="ml-3">
              <h3>Add more tasks</h3>
            </Row>
            <Row className="ml-3">
              <MyFilter returnResults={filterAllCards} workList={allCards} />
            </Row>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            {filteredAllCards.map((requestor, i) => (
              <Requestor
                key={`requestor-${i}`}
                requestor={requestor}
              />)
            )}
          </Row>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default MyWork
