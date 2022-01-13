// Server entry point is here
const { PORT } = require('./config')
const knexFile = require('./knexfile')
const cors = require('cors')
const express = require('express')
const app = express()

// For simplicity, allow all origins
app.use(cors())

// Parse JSON
app.use(express.json())


// Add database to request's context
const knexDb = require('knex')(knexFile)
app.use(function(req, res, next) {
  req.database = knexDb
  next()
})


// API endpoints
app.get('/products', async (req, res) => {
  try {
    const rows = await req.database('products').select('*')
    return res.send(rows)
  } catch (err) {
    console.error(err)
    return res.status(500).send({
      message: 'Failed to get products',
      error: err,
    })
  }
})

app.get('/reviews', async (req, res) => {
  const { productId } = req.query
  if (!productId) {
    return res.status(400).send({
      message: 'Invalid product ID',
    })
  }

  try {
    const results = await req.database('reviews').where({ product_id: productId })
    return res.send(results.map(row => {
      return {
        ...row,
        rating: parseFloat(row.rating),
      }
    }))
  } catch (err) {
    console.error(err)
    return res.status(500).send({
      message: 'Failed to get reviews',
      error: err,
    })
  }
})

app.post('/reviews', async function(req, res) {
  const { body } = req

  // Validate input
  if (!body) {
    return res.status(400).send({
      message: 'Invalid input',
    })
  }

  if (typeof body.productId !== 'number') {
    return res.status(400).send({
      message: 'Invalid product ID',
    })
  }

  if (typeof body.rating !== 'number' || body.rating < 1 || body.rating > 5) {
    return res.status(400).send({
      message: 'Invalid rating',
    })
  }

  try {
    const result = await req.database('reviews').insert({
      product_id: body.productId,
      rating: body.rating,
      comment: body.comment,
    })
    return res.status(201).send({
      inserted: result.rowCount,
    })
  } catch (err) {
    console.error(err)
    return res.status(500).send({
      message: 'Failed to create review',
      error: err,
    })
  }
})

app.post('/reviews/purge', async function(req, res) {
  try {
    const result = await req.database('reviews').delete()
    return res.status(201).send({
      result
    })
  } catch (err) {
    console.error(err)
    return res.status(500).send({
      message: 'Failed to delete all reviews',
      error: err,
    })
  }
})


// start Express app server
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`)
})
