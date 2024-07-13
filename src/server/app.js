import express from 'express'
import cors from 'cors'
import { serverLog } from './middlewares/serverLog.middleware.js'

import {
  findAll,
  findById,
  prepararHATEOAS
} from './models/inventario.models.js'

const app = express()
const PORT = process.env.PORT ?? 3000

app.use(cors())
app.use(express.json())
app.use(serverLog)

// traer todos los resultados
app.get('/joyas', async (req, res) => {
  try {
    const result = await findAll(req.query)
    const HATEOAS = prepararHATEOAS(result)
    res.status(200).json(HATEOAS)
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error.message)
    res.status(500).json({ status: false, message: 'Internal Server Error: (Todo)' })
  }
})

app.get('/joyas/filtros', async (req, res) => {
  try {
    const result = await findAll(req.query)
    res.status(200).json(result)
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error.message)
    res.status(500).json({ status: false, message: 'Internal Server Error: (Todo)' })
  }
})

// traer resultados por id
app.get('/joyas/:id', async (req, res) => {
  try {
    const result = await findById(req.params.id)
    res.status(200).json({ status: true, message: result })
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error.message)
    res.status(500).json({ status: false, message: 'Internal Server Error: (id)' })
  }
})

// manejo de todas las consultas
app.all('*', (__, res) =>
  res.status(404).json({ status: false, message: 'Page not found' })
)

app.listen(PORT, () => console.log('server UP'))

export default app
