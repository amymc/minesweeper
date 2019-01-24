import { initialise, placeFlag, reveal } from './grid.js'
import React, { useContext, useEffect, useReducer, useRef } from 'react'

export let AppContext = React.createContext()
export let useApp = () => useContext(AppContext)

let PLACE_FLAG = 'placeFlag'
let GET_SCARED = 'getScared'
let GET_HAPPY = 'getHappy'
let REVEAL = 'reveal'
let SWITCH_LEVEL = 'switchLevel'
let RESET = 'reset'
let TICK = 'tick'

let reducer = (state, action) => {
  switch (action.type) {
    case PLACE_FLAG:
      return {
        ...state,
        ...placeFlag(state, action),
      }

    case GET_SCARED:
      return { ...state, mood: 'isScared' }

    case GET_HAPPY:
      return { ...state, mood: 'isHappy' }

    case REVEAL:
      return { ...state, ...reveal(state, action) }

    case SWITCH_LEVEL:
      return initialise(action.level)

    case RESET:
      return initialise(state.level)

    case TICK:
      return { ...state, time: state.time + 1 }

    default:
      return state
  }
}

export let AppProvider = props => {
  let [state, dispatch] = useReducer(reducer, initialise())

  let interval = useRef()
  useEffect(() => {
    if (state.status === 'isPlaying') {
      interval.current = setInterval(tick, 1000)
    }

    return () => interval.current && clearInterval(interval.current)
  }, [state.status])

  let placeFlag = (event, { x, y }) => {
    if (state.status === 'hasLost') return

    event.preventDefault()

    dispatch({
      type: PLACE_FLAG,
      x,
      y,
    })
  }

  let getScared = event => {
    if (state.status === 'hasLost') return

    dispatch({ type: GET_SCARED })
  }

  let getHappy = event => {
    if (state.status === 'hasLost') return

    dispatch({ type: GET_HAPPY })
  }

  let reveal = (event, { x, y, hasMine, isEmpty }) => {
    if (state.status === 'hasLost') return

    dispatch({
      type: REVEAL,
      x,
      y,
      hasMine,
      isEmpty,
    })
  }

  let reset = () => {
    dispatch({ type: RESET })
  }

  let switchLevel = level => {
    dispatch({ type: SWITCH_LEVEL, level })
  }

  let tick = () => {
    dispatch({ type: TICK })
  }

  return (
    <AppContext.Provider
      value={{
        placeFlag,
        reset,
        reveal,
        getHappy,
        getScared,
        switchLevel,
        level: state.level,
        mood: state.mood,
        grid: state.grid,
        mines: state.mines,
        time: state.time,
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}
export const AppConsumer = AppContext.Consumer
