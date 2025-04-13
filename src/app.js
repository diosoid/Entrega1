import express from 'express'
import mongoose from 'mongoose'
import mocksRouter from './routes/mocks.router.js'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 



mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB')
    app.listen(PORT, () => {
      console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.error('❌ Error al conectar a MongoDB:', err)
  })

app.use('/api/mocks', mocksRouter)

app.listen(3000, () => console.log('Servidor escuchando en puerto 3000'))
