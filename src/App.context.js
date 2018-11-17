import React from "react"
import boards from "./boardsConfig"

const AppContext = React.createContext()

export class AppProvider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      grid: this.createGrid(boards.beginner),
      time: 0,
      status: "isStart", // isPlaying, hasLost, hasWon
      mood: "isHappy", // isScared, isDead, isCool
      level: "beginner", // intermediate, expert
      mines: boards.beginner.mines
    }
  }

  createGrid = ({ height, width, mines }) => {
    const cell = (i, j) => ({
      x: i,
      y: j,
      hasMine: false,
      isEmpty: false,
      isRevealed: false,
      isLosingCell: false,
      hasIcon: null, // flag, question
      neighbours: 0
    })

    const grid = Array(width)
      .fill(0)
      .map((_, i) =>
        Array(height)
          .fill(0)
          .map((_, j) => cell(i, j))
      )

    this.placeMines(grid, mines, height, width)
    this.getNeighbouringMines(grid, height, width)
    return grid
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

  getNeighbouringMines = (data, height, width) => {
    let updatedData = data
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (data[i][j].hasMine !== true) {
          let mines = 0
          const area = this.getNeighbouringCells(
            data[i][j].x,
            data[i][j].y,
            data,
            height,
            width
          )
          area.forEach(value => {
            if (value.hasMine) {
              mines++
            }
          })
          if (mines === 0) {
            updatedData[i][j].isEmpty = true
          }
          updatedData[i][j].neighbours = mines
        }
      }
    }
    return updatedData
  }

  getNeighbouringCells(x, y, data, height, width) {
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
    //dont reveal on right-click
    if (e.nativeEvent.which === 3 || this.state.status === "hasLost") return
    let updatedGrid = JSON.parse(JSON.stringify(this.state.grid))
    this.setState({ mood: "isScared" })

    if (this.state.status === "isStart") {
      this.setState({ status: "isPlaying" })
      this.interval = setInterval(this.tick.bind(this), 1000)
    }

    if (hasMine) {
      updatedGrid.map(column => column.map(cell => (cell.isRevealed = true)))
      updatedGrid[x][y].isLosingCell = true
      clearInterval(this.interval)
      this.setState({ status: "hasLost" })
    } else if (isEmpty) {
      this.revealEmpty(x, y, updatedGrid)
      updatedGrid[x][y].isRevealed = true
    } else {
      updatedGrid[x][y].isRevealed = true
    }

    if (this.getHidden(updatedGrid).length === this.state.mines) {
      clearInterval(this.interval)
      this.setState({ status: "hasWon" })
    } else {
      this.setState({ grid: updatedGrid })
    }
  }

  revealEmpty(x, y, grid) {
    let cells = this.getNeighbouringCells(
      x,
      y,
      grid,
      boards[this.state.level].height,
      boards[this.state.level].width
    )

    cells.forEach(cell => {
      if (
        !cell.hasIcon &&
        !cell.isRevealed &&
        (cell.isEmpty || !cell.hasMine)
      ) {
        grid[cell.x][cell.y].isRevealed = true

        if (cell.isEmpty) {
          this.revealEmpty(cell.x, cell.y, grid)
        }
      }
    })
    return grid
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
    this.setState({ time: this.state.time + 1 })
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
