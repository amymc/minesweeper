import React from "react"
import Cell from "./Cell.view.js"
import { AppConsumer } from "../App.context"

class CellLogic extends React.Component {
  // state = {
  //   isRevealed: false
  // }

  // reveal = () => {
  //   this.setState({ isRevealed: true })
  // }

  render() {
    return (
      <AppConsumer>
        {({ reveal }) => (
          <Cell
            {...this.props.item}
            onClick={e => reveal(e, this.props.item)}
          />
        )}
      </AppConsumer>
    )
  }
}

export default CellLogic
