import MenuItem from "./MenuItem.view.js"
import React from "react"

const MenuItemLogic = props => {
  return (
    <MenuItem
      {...props}
      isSelected={props.title.toLowerCase() === props.level}
    />
  )
}

export default MenuItemLogic
