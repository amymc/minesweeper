import Status from "./Status.view.js"
import React from "react"

export default class StatusLogic extends React.Component {
  state = {
    isPressed: false
  }

  onMouseDown = () => {
    this.setState({ isPressed: true })
  }

  onMouseUp = () => {
    this.setState({ isPressed: false })
  }

  render() {
    const { props, state } = this
    return (
      <Status
        {...props}
        isPressed={state.isPressed}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
      />
    )
  }
}
