import { useEffect } from 'react'
import { createContext, useState } from 'react'
import Notification from '../components/Notification'

const NotificationContext = createContext()

const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState('')
  const [bgColor, setBgColor] = useState('bg-red-500')

  const renderNotification = (type, message) => {
    switch (type) {
      case 'error':
        setBgColor('bg-red-500')
        break
      case 'warning':
        setBgColor('bg-orange-500')
        break
      case 'success':
        setBgColor('bg-green-500')
        break
      default:
        setBgColor('bg-red-500')
    }
    setMessage(message)
  }

  useEffect(() => {
    const removeNotification = setTimeout(() => {
      setMessage('')
    }, 3000)

    return () => clearInterval(removeNotification)
  }, [message])

  return (
    <NotificationContext.Provider value={{ renderNotification }}>
      {message && <Notification bgColor={bgColor} message={message} />}
      {children}
    </NotificationContext.Provider>
  )
}
export { NotificationContext }
export default NotificationProvider
