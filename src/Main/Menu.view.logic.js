import React from "react"
import { AppConsumer } from "../App.context"
import Menu from "./Menu.view.js"
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
      <AppConsumer>
        {({ list }) => (
          <div ref={this.setWrapperRef}>
            <Menu {...props} from={list} />
          </div>
        )}
      </AppConsumer>
    )
  }
}
