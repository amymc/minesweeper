import Menu from "./Menu.view.js"
import React from "react"

const list = [
  {
    title: "New"
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

export default class MenuLogic extends React.Component {
  render() {
    const { props } = this
    return <Menu {...props} from={list} />
  }
}
