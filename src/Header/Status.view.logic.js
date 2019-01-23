import Status from './Status.view.js'
import React, { useState } from 'react'

let StatusLogic = props => {
  let [state, setState] = useState({
    isPressed: false,
  })

  let onMouseDown = () => {
    setState({ isPressed: true })
  }

  let onMouseUp = () => {
    setState({ isPressed: false })
  }

  return (
    <Status
      {...props}
      isPressed={state.isPressed}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    />
  )
}

export default StatusLogic
