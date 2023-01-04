import { useContext } from 'react'
import { NotificationContext } from '../context/NotificationProvider'

const useNotification = () => useContext(NotificationContext)

export default useNotification
