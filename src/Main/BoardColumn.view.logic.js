import React from "react"
import BoardColumn from "./BoardColumn.view.js"

class BoardColumnLogic extends React.Component {
  render() {
    return <BoardColumn {...this.props} {...this.state} />
  }
}

export default BoardColumnLogic
