import React from "react"
import Cell from "./Cell.view.js"
import { AppConsumer } from "../App.context"

class CellLogic extends React.Component {
  render() {
    return (
      <AppConsumer>
        {({ onMouseUp, placeFlag, reveal }) => (
          <Cell
            {...this.props.item}
            onMouseUp={onMouseUp}
            onMouseDown={e => reveal(e, this.props.item)}
            onContextMenu={e => placeFlag(e, this.props.item)}
            isOne={this.props.item.neighbour === 1}
            isTwo={this.props.item.neighbour === 2}
            isThree={this.props.item.neighbour === 3}
            isFour={this.props.item.neighbour === 4}
          />
        )}
      </AppConsumer>
    )
  }
}

export default CellLogic
