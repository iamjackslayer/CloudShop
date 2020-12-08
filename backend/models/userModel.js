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

userSchema.methods.matchPassword = async function (password) {
  const isMatching = bcrypt.compareSync(password, this.password)
  return isMatching
}

const User = mongoose.model('User', userSchema)

export default User
