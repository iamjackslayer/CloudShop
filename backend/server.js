import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import productRouter from './routes/productRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use('/api/products', productRouter)

app.get('/', (req, res) => {
  res.send('API is running')
})

const PORT = process.env.PORT || 5000
const NODE_ENV = process.env.NODE_ENV
app.listen(
  PORT,
  console.log(`app running in ${NODE_ENV} on port ${PORT}`.yellow.bold)
)
