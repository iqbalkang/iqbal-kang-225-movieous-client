const validateUserInfo = ({ name = null, email = null, password = null }) => {
  const isValidName = /^[A-Z a-z]+$/
  const isValidEmail = /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/

  if (name !== null) {
    if (!name.trim()) return { valid: false, err: 'Please enter a name' }
    if (!isValidName.test(name)) return { valid: false, err: 'Invalid name' }
  }

  if (email !== null) {
    if (!email.trim()) return { valid: false, err: 'Please enter an email' }
    if (!isValidEmail.test(email)) return { valid: false, err: 'Invalid email' }
  }

  if (password !== null) {
    if (!password.trim()) return { valid: false, err: 'Please enter a password' }
    if (password.length < 5) return { valid: false, err: 'Password has to be atleast 5 characters long' }
  }

  return { valid: true }
}

export default validateUserInfo
