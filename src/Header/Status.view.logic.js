import Status from './Status.view.js'
import React, { useState } from 'react'

let StatusLogic = props => {
  let pressed = usePressed()

  return <Status {...props} {...pressed} />
}

export default StatusLogic

let usePressed = () => {
  let [isPressed, setIsPressed] = useState(false)

  let onMouseDown = () => setIsPressed(true)
  let onMouseUp = () => setIsPressed(false)

  return {
    isPressed,
    onMouseDown,
    onMouseUp,
  }
}
