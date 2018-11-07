import React from "react"

const AppContext = React.createContext()
export class AppProvider extends React.Component {
  constructor(props) {
    super(props)
    const height = 8
    const width = 8
    const mines = 10
    this.state = {
      grid: this.createGrid(height, width, mines),
      time: 0,
      status: "isStart", //isPlaying, hasLost, hasWon
      mood: "isHappy", //isScared, isDead, isCool
      level: "beginner", //intermediate, expert
      mines,
      height,
      width
    }
  }

  createGrid = (height, width, mines) => {
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
          hasFlag: false,
          neighbour: 0
        }
      }
    }

    arr = this.placeMines(arr, mines, height, width)
    arr = this.getNeighbours(arr, height, width)
    return arr
  }

  placeFlag = (e, cell) => {
    e.preventDefault()
    let updatedGrid = this.state.grid
    updatedGrid[cell.x][cell.y].hasFlag = true
    this.setState({ mines: this.state.mines - 1 })
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
    const el = []
    //up
    if (x > 0) {
      el.push(data[x - 1][y])
    }
    //down
    if (x < height - 1) {
      el.push(data[x + 1][y])
    }
    //left
    if (y > 0) {
      el.push(data[x][y - 1])
    }
    //right
    if (y < width - 1) {
      el.push(data[x][y + 1])
    }
    // top left
    if (x > 0 && y > 0) {
      el.push(data[x - 1][y - 1])
    }
    // top right
    if (x > 0 && y < width - 1) {
      el.push(data[x - 1][y + 1])
    }
    // bottom right
    if (x < height - 1 && y < width - 1) {
      el.push(data[x + 1][y + 1])
    }
    // bottom left
    if (x < height - 1 && y > 0) {
      el.push(data[x + 1][y - 1])
    }

    return el
  }

  onMouseUp = () => {
    const mood = this.state.status === "hasLost" ? "isDead" : "isHappy"
    this.setState({ mood })
  }

  reveal = (e, cell) => {
    if (this.state.status === "hasLost") return
    //dont reveal on right-click
    if (e.nativeEvent.which === 3) return
    this.setState({ mood: "isScared" })

    if (this.state.status === "isStart") {
      this.setState({ status: "isPlaying" })
      this.interval = setInterval(this.tick.bind(this), 1000)
    }

    let updatedGrid = this.state.grid

    if (cell.hasMine) {
      updatedGrid.map(column => column.map(cell => (cell.isRevealed = true)))
      updatedGrid[cell.x][cell.y].isLosingCell = true
      clearInterval(this.interval)
      this.setState({ grid: updatedGrid, status: "hasLost" })
    } else if (cell.isEmpty) {
      updatedGrid = this.revealEmpty(cell.x, cell.y, updatedGrid)
      updatedGrid[cell.x][cell.y].isRevealed = true
      this.setState({ grid: updatedGrid })
    } else {
      updatedGrid[cell.x][cell.y].isRevealed = true
      this.setState({ grid: updatedGrid })
    }
  }

  revealEmpty(x, y, data) {
    let area = this.traverseBoard(
      x,
      y,
      data,
      this.state.height,
      this.state.width
    )

    area.map(value => {
      if (
        !value.hasFlag &&
        !value.isRevealed &&
        (value.isEmpty || !value.hasMine)
      ) {
        data[value.x][value.y].isRevealed = true
        if (value.isEmpty) {
          this.revealEmpty(value.x, value.y, data)
        }
      }
    })
    return data
  }

  reset = () => {
    const { height, width, mines } = this.state
    this.setState({
      grid: this.createGrid(height, width, mines),
      mood: "isHappy",
      status: "isStart",
      time: 0
    })
  }

  switchLevel = level => {
    let grid, mines, height, width
    if (level === "intermediate") {
      grid = this.createGrid(12, 12, 20)
      mines = 20
      height = 12
      width = 12
    } else if (level === "expert") {
      grid = this.createGrid(16, 16, 40)
      mines = 40
      height = 16
      width = 16
    } else {
      grid = this.createGrid(8, 8, 10)
      mines = 10
      height = 8
      width = 8
    }
    this.setState({ grid, mines, height, width, level })
  }

  tick = () => {
    if (this.state.status === "isPlaying") {
      this.setState({ time: this.state.time + 1 })
    }
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
