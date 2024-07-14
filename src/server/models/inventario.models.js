import db from '../database/db_connect.js'
import 'dotenv/config'
import format from 'pg-format'

export const findAll = async ({ limits = 6, page = 1, order_by = 'stock_ASC', precio_min, precio_max, categoria, metal }) => {
  let query = 'SELECT * FROM inventario'
  const filtros = []
  const values = []

  if (precio_min) {
    values.push(precio_min)
    filtros.push(`precio >= $${values.length}`)
  }

  if (precio_max) {
    values.push(precio_max)
    filtros.push(`precio <= $${values.length}`)
  }

  if (categoria) {
    values.push(categoria)
    filtros.push(`categoria = $${values.length}`)
  }

  if (metal) {
    values.push(metal)
    filtros.push(`metal = $${values.length}`)
  }

  if (filtros.length > 0) {
    query += ` WHERE ${filtros.join(' AND ')}`
  }

  const [column, sort] = order_by.split('_')
  const offset = Math.abs(page > 0 ? page - 1 : 0) * limits

  const formattedQuery = format(`${query} ORDER BY %I %s LIMIT %s OFFSET %s;`, column, sort, limits, offset)
  return await db(formattedQuery, values)
}

export const findById = async (id) => await db('SELECT * FROM inventario WHERE id = $1;', [id])

export const prepararHATEOAS = (result) => {
  const stockTotal = result.reduce((total, j) => total + j.stock, 0)
  const results = result.map((j) => ({
    name: j.nombre,
    href: `${process.env.RUTA}/joyas/${j.id}`,
    stock: j.stock
  }))

  return {
    totalJoyas: result.length,
    stockTotal,
    results
  }
}
