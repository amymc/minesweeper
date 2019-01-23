import Status from './Status.view.js'
import React, { useState } from 'react'

let StatusLogic = props => {
  let [isPressed, setIsPressed] = useState(false)

  let onMouseDown = () => setIsPressed(true)
  let onMouseUp = () => setIsPressed(false)

  return (
    <Status
      {...props}
      isPressed={isPressed}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    />
  )
}

export default StatusLogic
