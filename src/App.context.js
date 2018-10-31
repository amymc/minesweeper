import React from "react"

const AppContext = React.createContext()
export class AppProvider extends React.Component {
  constructor(props) {
    super(props)
    const height = 8
    const width = 8
    const mines = 10
    const list = [
      {
        title: "New",
        onClick: this.reset
      },
      {
        title: "Beginner"
      },
      {
        title: "Intermediate"
      },
      {
        title: "Expert"
      },
      {
        title: "Best Times..."
      },
      {
        title: "Exit"
      }
    ]
    this.state = {
      grid: this.createGrid(height, width, mines),
      time: 0,
      status: "isStart", //isPlaying, isOver, hasWon
      mood: "isHappy", //isScared, isDead, isCool
      list,
      mines,
      height,
      width
    }
  }

  // 40 mines 16 * 16 , 99 mines 16 * 30

  createGrid = (height, width, mines) => {
    let arr = []
    for (var i = 0; i < width; i++) {
      arr[i] = []
      for (var j = 0; j < height; j++) {
        arr[i][j] = {
          x: i,
          y: j,
          hasMine: false,
          isRevealed: false,
          isLosingCell: false,
          hasFlag: false,
          neighbour: 0
        }
      }
    }

    arr = this.placeMines(arr, mines)
    arr = this.getNeighbours(arr, height, width)
    debugger
    return arr
  }

  placeFlag = (e, cell) => {
    e.preventDefault()
    let updatedGrid = this.state.grid
    updatedGrid[cell.x][cell.y].hasFlag = true
    this.setState({ mines: this.state.mines - 1 })
  }

  placeMines = (gridArr, mines) => {
    let minesPlaced = 0
    while (minesPlaced < mines) {
      const randomx = Math.floor(Math.random() * 8)
      const randomy = Math.floor(Math.random() * 8)
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
    const mood = this.state.status === "isOver" ? "isDead" : "isHappy"
    this.setState({ mood })
  }

  reveal = (e, cell) => {
    if (this.state.status === "isOver") return
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
      this.setState({ grid: updatedGrid, status: "isOver" })
    } else {
      updatedGrid[cell.x][cell.y].isRevealed = true
      this.setState({ grid: updatedGrid })
    }
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
          list: state.list,
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
