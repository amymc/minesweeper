import React from "react"
import Cell from "./Cell.view.js"
import { AppConsumer } from "../App.context"

class CellLogic extends React.Component {
  render() {
    return (
      <AppConsumer>
        {({ placeFlag, reveal }) => (
          <Cell
            {...this.props.item}
            onClick={e => reveal(e, this.props.item)}
            onContextMenu={e => placeFlag(e, this.props.item)}
          />
        )}
      </AppConsumer>
    )
  }
}

export default CellLogic
