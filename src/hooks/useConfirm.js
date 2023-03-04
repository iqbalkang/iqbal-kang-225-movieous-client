import React, { useContext } from 'react'
import { ConfirmModalContext } from '../context/ConfirmModalProvider'

const useConfirm = () => useContext(ConfirmModalContext)

export default useConfirm
