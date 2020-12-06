// Not connected to server.js. So have to import all these.
import mongoose from 'mongoose'
import colors from 'colors'
import dotenv from 'dotenv'
import users from './data/users.js'
import products from './data/products.js'
import Order from './models/orderModel.js'
import Product from './models/productModel.js'
import User from './models/userModel.js'
import connectDB from './config/db.js'

dotenv.config()

await connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)

    const adminUser = createdUsers[0]

    const sampleProducts = products.map(product => {
      return { ...product, user: adminUser._id }
    })

    await Product.insertMany(sampleProducts)

    console.log('Data imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()
    console.log(`Data destroyed!`.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
