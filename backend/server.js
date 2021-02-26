import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'
import morgan from 'morgan'
import connectDB from './config/db.js'
import productRouter from './routes/productRoutes.js'
import userRouter from './routes/userRoutes.js'
import orderRouter from './routes/orderRoutes.js'
import uploadRouter from './routes/uploadRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express()
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(express.json())
app.use(cors())

app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)
app.use('/api/upload', uploadRouter)
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

const __dirname = path.resolve() // cus __dirname is a commonJs syntax, but we're using ES module
app.use('/uploads', express.static(path.join(__dirname, '/uploads'))) // make /uploads accessible to the browser by making /uploads a static folder
if (process.env.NODE_ENV === 'production') {
  console.log('Dev debug:\n root dir:\n  ' + __dirname)
  app.use('/', express.static(path.join(__dirname, 'frontend', 'build')))
  app.use('*', (req, res) => {
    console.log('a *')
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
  })
}

app.use(notFound) // called when no routes match

// four args means the function is an error-handling middleware
// error-handling middleware is added to the end of the middleware function stack
// Called when error is thrown during req-res cycle.
app.use(errorHandler)

const PORT = process.env.PORT || 5000
const NODE_ENV = process.env.NODE_ENV
app.listen(
  PORT,
  console.log(`app running in ${NODE_ENV} on port ${PORT}`.yellow.bold)
)
