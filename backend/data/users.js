import bcrypt from 'bcryptjs'
const salt = bcrypt.genSaltSync(10)
const users = [
  {
    name: 'Admin User',
    email: 'admin@cloudshop.com',
    password: bcrypt.hashSync('123456', salt)
  },
  {
    name: 'Joseph Pairin',
    email: 'jos@cloudshop.com',
    password: bcrypt.hashSync('123456', salt)
  },
  {
    name: 'Laurel Wong',
    email: 'laurel@cloudshop.com',
    password: bcrypt.hashSync('123456', salt)
  }
]

export default users
