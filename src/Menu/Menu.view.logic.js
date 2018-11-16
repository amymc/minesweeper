import React from "react"
import Menu from "./Menu.view.js"
import composeList from "../composeList.js"

export default class MenuLogic extends React.Component {
  state = {
    list: []
  }

  componentDidMount = () => {
    document.addEventListener("mousedown", this.handleClickOutside)
    this.setState({ list: composeList(this.props) })
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
    const { props, state } = this
    return (
      <div ref={this.setWrapperRef}>
        <Menu {...props} from={state.list} />
      </div>
    )
  }
}
