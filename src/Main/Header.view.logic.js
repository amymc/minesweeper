import Header from "./Header.view.js"
import React from "react"

export default class HeaderLogic extends React.Component {
  render() {
    const { props } = this
    return <Header {...props} text={"010"} />
  }
}
