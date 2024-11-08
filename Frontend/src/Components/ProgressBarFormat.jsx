import React from 'react'
import { ProgressBar } from 'react-bootstrap'

const ProgressBarFormat = (props) => {
    const {now} = props
  return (
    <ProgressBar className="progress-bar-custom" striped now={now} label={`${now}%`} />
  )
}

export default ProgressBarFormat