import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const Response = (props) => {
  if (decisionType) {
    return (
      <ButtonGroup toggle>
      {['True', 'Undecided', 'False'].map((value, idx) => (
        <ToggleButton
          key={`decisionTask-${idx}`}
          type="radio"
          variant="secondary"
          name="radio"
          value={value}
          checked={decisionTask === value}
          onChange={(e) => setDecisionTask(e.currentTarget.value)}
        >
          {value}
        </ToggleButton>
      ))}
      </ButtonGroup>
    )
  }
  return (
    <>
    </>
  )
}

export default Response
