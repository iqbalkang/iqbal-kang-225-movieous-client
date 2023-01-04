const { useContext } = require('react')
const { AuthContext } = require('../context/AuthProvider')

const useAuth = () => useContext(AuthContext)

export default useAuth
