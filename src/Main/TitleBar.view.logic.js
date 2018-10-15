import TitleBar from './TitleBar.view.js'
import React from 'react'

export default class TitleBarLogic extends React.Component {
  render() {
    const { props } = this
    return <TitleBar {...props} />
  }
}