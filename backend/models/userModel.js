import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  {
    timestamps: true
  }
)

userSchema.methods.matchPassword = function (password) {
  const isMatching = bcrypt.compareSync(password, this.password)
  return isMatching
}

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    // not registering. Could be update user data in which case we don't want to hash the password
    next()
  }
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(this.password, salt)
  this.password = hash
  next()
})

const User = mongoose.model('User', userSchema)

export default User
