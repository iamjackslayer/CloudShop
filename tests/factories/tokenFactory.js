const dotenv = require('dotenv')
dotenv.config()
const jwt = require('jsonwebtoken')

module.exports = userId => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
  return token
}
