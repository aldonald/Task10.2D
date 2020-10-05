import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const MyFilter = (props) => {
  const [myWorkList, setMyWorkList] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [loading, setLoading] = useState(true)

  const filterJobs = (ev) => {
    const searchTerms = ev.target.value
    let filteredJobs
    if (searchTerms) {
      filteredJobs = props.workList.filter((item) => {
        let contents = (
          item.description
          + item.title
          + item.decisionTaskQuestion
          + item.sentenceTaskQuestion
          + item.imageProcessingQuestion
          + item.choiceQuestion
          + item.expiry
        )
        contents = contents.toLowerCase()
        return contents.indexOf(searchTerms.toLowerCase()) !== -1
      })
    } else {
      filteredJobs = props.workList
    }
    props.returnResults(filteredJobs)
  }

  return (
    <Form inline style={{float: 'right'}} className="mr-0">
      <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={filterJobs} />
      <Button variant="outline-success">Search</Button>
    </Form>
  )

}

MyFilter.propTypes = {
  returnResults: PropTypes.func
}

export default MyFilter
