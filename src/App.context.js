import React from "react"
import boards from "./boardsConfig"

const AppContext = React.createContext()

export class AppProvider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      grid: this.createGrid(boards.beginner),
      time: 0,
      status: "isStart", // isPlaying hasLost, hasWon
      mood: "isHappy", // isScared, isDead, isCool
      level: "beginner", // intermediate, expert
      mines: boards.beginner.mines
    }
  }

  createGrid = ({ height, width, mines }) => {
    let arr = []
    for (var i = 0; i < width; i++) {
      arr[i] = []
      for (var j = 0; j < height; j++) {
        arr[i][j] = {
          x: i,
          y: j,
          hasMine: false,
          isEmpty: false,
          isRevealed: false,
          isLosingCell: false,
          hasIcon: null, // flag, question
          neighbour: 0
        }
      }
    }

    arr = this.placeMines(arr, mines, height, width)
    arr = this.getNeighbours(arr, height, width)
    return arr
  }

  placeFlag = (e, { x, y }) => {
    if (this.state.status === "hasLost") return
    e.preventDefault()

    const column = JSON.parse(JSON.stringify(this.state.grid[x]))
    let mines = this.state.mines

    if (column[y].hasIcon === "question") {
      column[y].hasIcon = null
    } else if (column[y].hasIcon === "flag") {
      column[y].hasIcon = "question"
      mines++
    } else {
      column[y].hasIcon = "flag"
      mines--
    }

    this.setState({
      grid: [
        ...this.state.grid.slice(0, x),
        column,
        ...this.state.grid.slice(x + 1)
      ],
      mines
    })
  }

  placeMines = (gridArr, mines, height, width) => {
    let minesPlaced = 0
    while (minesPlaced < mines) {
      const randomx = Math.floor(Math.random() * width)
      const randomy = Math.floor(Math.random() * height)
      if (!gridArr[randomx][randomy].hasMine) {
        gridArr[randomx][randomy].hasMine = true
        minesPlaced++
      }
    }
    return gridArr
  }

  getNeighbours = (data, height, width) => {
    let updatedData = data
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (data[i][j].hasMine !== true) {
          let mine = 0
          const area = this.traverseBoard(
            data[i][j].x,
            data[i][j].y,
            data,
            height,
            width
          )
          area.forEach(value => {
            if (value.hasMine) {
              mine++
            }
          })
          if (mine === 0) {
            updatedData[i][j].isEmpty = true
          }
          updatedData[i][j].neighbour = mine
        }
      }
    }
    return updatedData
  }

  // looks for neighbouring cells and returns them
  traverseBoard(x, y, data, height, width) {
    const coordinates = [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1],
      [x - 1, y - 1],
      [x - 1, y + 1],
      [x + 1, y + 1],
      [x + 1, y - 1]
    ]

    const filteredCoordinates = coordinates.filter(
      coord =>
        coord[0] >= 0 && coord[0] < height && coord[1] >= 0 && coord[1] < width
    )

    return filteredCoordinates.map(coord => data[coord[0]][coord[1]])
  }

  onMouseUp = () => {
    const mood =
      this.state.status === "hasLost"
        ? "isDead"
        : this.state.status === "hasWon"
        ? "isCool"
        : "isHappy"
    this.setState({ mood })
  }

  reveal = (e, { x, y, hasMine, isEmpty }) => {
    if (this.state.status === "hasLost") return
    //dont reveal on right-click
    if (e.nativeEvent.which === 3) return
    this.setState({ mood: "isScared" })
    if (this.state.status === "isStart") {
      this.setState({ status: "isPlaying" })
      this.interval = setInterval(this.tick.bind(this), 1000)
    }
    let updatedGrid = this.state.grid
    if (hasMine) {
      updatedGrid.map(column => column.map(cell => (cell.isRevealed = true)))
      updatedGrid[x][y].isLosingCell = true
      clearInterval(this.interval)
      this.setState({ grid: updatedGrid, status: "hasLost" })
    } else if (isEmpty) {
      updatedGrid = this.revealEmpty(x, y, updatedGrid)
      updatedGrid[x][y].isRevealed = true
      this.setState({ grid: updatedGrid })
    } else {
      updatedGrid[x][y].isRevealed = true
      this.setState({ grid: updatedGrid })
    }
    if (this.getHidden(updatedGrid).length === this.state.mines) {
      clearInterval(this.interval)
      this.setState({ status: "hasWon" })
    }
  }

  revealEmpty(x, y, data) {
    let area = this.traverseBoard(
      x,
      y,
      data,
      boards[this.state.level].height,
      boards[this.state.level].width
    )

    area.forEach(value => {
      if (
        !value.hasIcon &&
        !value.isRevealed &&
        (value.isEmpty || !value.hasMine)
      ) {
        data[value.x][value.y].isRevealed = true

        if (value.isEmpty) {
          this.revealEmpty(value.x, value.y, data)
        }
      }
    })
    // debugger
    return data
  }

  getHidden = data =>
    data.map(datarow => datarow.filter(dataitem => !dataitem.isRevealed)).flat()

  reset = () => {
    this.setState({
      grid: this.createGrid(boards[this.state.level]),
      mines: boards[this.state.level].mines,
      mood: "isHappy",
      status: "isStart",
      time: 0
    })
    clearInterval(this.interval)
  }

  switchLevel = level => {
    this.setState({ level }, this.reset)
  }

  tick = () => {
    // this.setState({ time: this.state.time + 1 })
  }

  render() {
    const { props, state } = this
    return (
      <AppContext.Provider
        value={{
          placeFlag: this.placeFlag,
          reset: this.reset,
          reveal: this.reveal,
          onMouseUp: this.onMouseUp,
          switchLevel: this.switchLevel,
          level: state.level,
          mood: state.mood,
          grid: state.grid,
          mines: state.mines,
          time: state.time
        }}
      >
        {props.children}
      </AppContext.Provider>
    )
  }
}
export const AppConsumer = AppContext.Consumer
