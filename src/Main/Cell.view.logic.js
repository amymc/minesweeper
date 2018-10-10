import React from "react"
import Cell from "./Cell.view.js"
import { AppConsumer } from "../App.context"

class CellLogic extends React.Component {
  state = {
    showFlag: false
  }

  // reveal = () => {
  //   this.setState({ isRevealed: true })
  // }

  contextMenu = e => {
    e.preventDefault()
    this.setState({ showFlag: true })
  }

  render() {
    return (
      <AppConsumer>
        {({ reveal }) => (
          <Cell
            {...this.props.item}
            onClick={e => reveal(e, this.props.item)}
            onContextMenu={this.contextMenu}
            {...this.state}
          />
        )}
      </AppConsumer>
    )
  }
}

export default CellLogic
