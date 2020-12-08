import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import productRouter from './routes/productRoutes.js'
import userRouter from './routes/userRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express()
app.use(express.json())

app.use('/api/products', productRouter)
app.use('/api/users', userRouter)

app.use(notFound) // called when no routes match

// four args means the function is an error-handling middleware
// error-handling middleware is added to the end of the middleware function stack
// Called when error is thrown during req-res cycle.
app.use(errorHandler)

app.get('/', (req, res) => {
  res.send('API is running')
})

const PORT = process.env.PORT || 5000
const NODE_ENV = process.env.NODE_ENV
app.listen(
  PORT,
  console.log(`app running in ${NODE_ENV} on port ${PORT}`.yellow.bold)
)
