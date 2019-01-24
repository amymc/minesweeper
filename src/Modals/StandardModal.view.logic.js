import { useApp } from '../App.context'
import { useModal } from '../Modal.context'
import React from 'react'
import StandardModal from './StandardModal.view.js'

const StandardModalLogic = props => {
  let { reset } = useApp()
  let { toggleItem } = useModal()

  return (
    <StandardModal
      {...props}
      toggleItem={toggleItem}
      playAgain={e => {
        toggleItem(e)
        reset()
      }}
    />
  )
}

export default StandardModalLogic
