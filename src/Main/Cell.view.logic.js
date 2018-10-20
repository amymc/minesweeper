import React from "react"
import Cell from "./Cell.view.js"
import { AppConsumer } from "../App.context"

class CellLogic extends React.Component {
  render() {
    return (
      <AppConsumer>
        {({ onMouseDown, placeFlag, reveal }) => (
          <Cell
            {...this.props.item}
            onMouseDown={e => onMouseDown()}
            onMouseUp={e => reveal(e, this.props.item)}
            onContextMenu={e => placeFlag(e, this.props.item)}
          />
        )}
      </AppConsumer>
    )
  }
}

export default CellLogic
