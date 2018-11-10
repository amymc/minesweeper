import React from "react"
import Cell from "./Cell.view.js"
import { AppConsumer } from "../App.context"

class CellLogic extends React.Component {
  getColor = neighbour =>
    neighbour === 1
      ? "#0E00FF"
      : neighbour === 2
      ? "#048001"
      : neighbour === 3
      ? "#ea3a32"
      : "#060084"

  render() {
    const { item } = this.props

    return (
      <AppConsumer>
        {({ onMouseUp, placeFlag, reveal }) => (
          <Cell
            {...item}
            onMouseUp={onMouseUp}
            onMouseDown={e => reveal(e, item)}
            onContextMenu={e => placeFlag(e, item)}
            color={this.getColor(item.neighbour)}
            shouldShowFlag={!item.isRevealed && item.hasIcon === "flag"}
            shouldShowQuestion={!item.isRevealed && item.hasIcon === "question"}
            shouldShowMine={item.isRevealed && item.hasMine}
            shouldShowCount={item.isRevealed && !item.isEmpty && !item.hasMine}
          />
        )}
      </AppConsumer>
    )
  }
}

export default CellLogic
