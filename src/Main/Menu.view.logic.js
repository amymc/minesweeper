import React from "react"
import Menu from "./Menu.view.js"

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
  componentDidMount = () => {
    console.log(this.props)

    document.addEventListener("mousedown", this.handleClickOutside)
  }

  componentWillUnmount = () => {
    document.removeEventListener("mousedown", this.handleClickOutside)
  }

  setWrapperRef = node => {
    this.wrapperRef = node
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside = e => {
    e.stopPropagation()
    if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
      console.log(this.props)
      this.props.toggleItem({ currentTarget: { name: "showMenu" } })
    }
  }
  render() {
    const { props } = this
    return (
      <div ref={this.setWrapperRef}>
        <Menu {...props} from={list} />
      </div>
    )
  }
}
