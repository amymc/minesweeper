import React from "react"

const AppContext = React.createContext()
export class AppProvider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      grid: this.createGrid(),
      isDead: false
    }
  }

  createGrid = () => {
    const height = 8
    const width = 8
    const mines = 10
    let arr = []
    for (var i = 0; i < width; i++) {
      arr[i] = []
      for (var j = 0; j < height; j++) {
        arr[i][j] = { x: i, y: j, isRevealed: false, isLosingCell: false }
      }
    }

    this.placeMines(arr, mines)
    return arr
  }

  placeMines = (gridArr, mines) => {
    let minesPlaced = 0
    while (minesPlaced < mines) {
      const randomx = Math.floor(Math.random() * 8)
      const randomy = Math.floor(Math.random() * 8)
      if (!gridArr[randomx][randomy].isMine) {
        gridArr[randomx][randomy].hasMine = true
        minesPlaced++
      }
    }
    return gridArr
  }

  reveal = (e, cell) => {
    if (this.state.isDead) return
    let updatedGrid = this.state.grid

    if (cell.hasMine) {
      updatedGrid.map(column => column.map(cell => (cell.isRevealed = true)))
      updatedGrid[cell.x][cell.y].isLosingCell = true
      this.setState({ grid: updatedGrid, isDead: true })
    } else {
      updatedGrid[cell.x][cell.y].isRevealed = true
      this.setState({ grid: updatedGrid })
    }
  }
  render() {
    const { props, state } = this
    return (
      <AppContext.Provider
        value={{
          reveal: this.reveal,
          isDead: state.isDead,
          grid: state.grid
        }}
      >
        {props.children}
      </AppContext.Provider>
    )
  }
}
export const AppConsumer = AppContext.Consumer
