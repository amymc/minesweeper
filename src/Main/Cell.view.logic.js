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
    return (
      <AppConsumer>
        {({ onMouseUp, placeFlag, reveal }) => (
          <Cell
            {...this.props.item}
            onMouseUp={onMouseUp}
            onMouseDown={e => reveal(e, this.props.item)}
            onContextMenu={e => placeFlag(e, this.props.item)}
            color={this.getColor(this.props.item.neighbour)}
          />
        )}
      </AppConsumer>
    )
  }
}

export default CellLogic
