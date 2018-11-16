import MenuItem from "./MenuItem.view.js"
import React from "react"

export default class MenuItemLogic extends React.Component {
  render() {
    const { props } = this
    return (
      <MenuItem
        {...props}
        isSelected={props.title.toLowerCase() === props.level}
      />
    )
  }
}
