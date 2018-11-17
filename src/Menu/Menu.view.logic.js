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

  handleClickOutside = e => {
    e.stopPropagation()
    if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
      this.props.toggleItem({ currentTarget: { name: null } })
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
