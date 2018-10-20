import Menu from "./Menu.view.js"
import React from "react"

const list = [
  {
    title: "beginner"
  },
  {
    title: "intermediate"
  }
]

export default class MenuLogic extends React.Component {
  render() {
    const { props } = this
    return <Menu {...props} from={list} />
  }
}
