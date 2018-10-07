import React from "react"
import BoardColumn from "./BoardColumn.view.js"

class BoardColumnLogic extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <BoardColumn {...this.props} {...this.state} />
  }
}

export default BoardColumnLogic
