import Status from "./Status.view.js"
import React from "react"

export default class StatusLogic extends React.Component {
  state = {
    isPressed: false
  }

  toggleState = () => {
    this.setState({ isPressed: !this.state.isPressed })
  }

  render() {
    const { props, state } = this
    return (
      <Status
        {...props}
        isPressed={this.state.isPressed}
        toggleState={this.toggleState}
      />
    )
  }
}
