import VideoModal from "./VideoModal.view.js"
import React from "react"

export default class VideoModalLogic extends React.Component {
  state = {
    shouldRotate: false
  }

  componentDidMount() {
    this.rotateInterval = setInterval(() => {
      if (this.unmounted) {
        clearInterval(this.rotateInterval)
        return
      }

      requestIdleCallback(() => {
        if (this.unmounted) return

        this.setState({ shouldRotate: !this.state.shouldRotate })
      })
    }, 1000)
  }

  componentWillUnmount() {
    this.unmounted = true
  }

  render() {
    const { props, state } = this
    return <VideoModal {...props} {...state} />
  }
}
