import React from "react"
import Board from "./Board.view.js"
import { AppConsumer } from "../App.context"

class BoardLogic extends React.Component {
  // state = {
  //   isRevealed: false
  // }

  // reveal = (e, cell) => {
  //   if (cell.hasMine) {
  //     this.setState({ isDead: true })
  //   }
  //   // this.setState({ isRevealed: true })
  // }

  render() {
    return (
      <AppConsumer>
        {({ grid }) => <Board {...this.props} grid={grid} />}
      </AppConsumer>
    )
  }
}

export default BoardLogic
