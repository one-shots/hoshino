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
app.use(function(req, res, next) {
  req.database = require('knex')(knexFile)
  next()
})


// API endpoints
app.get('/products', async (req, res) => {
  try {
    const rows = await req.database('products').select('*')
    return res.send(rows)
  } catch (err) {
    return res.status(500).send({
      message: 'Failed to get products',
    })
  }
})

app.get('/reviews', async (req, res) => {
  const { productId } = req.params
  if (!productId) {
    return res.status(400).send({
      message: 'Invalid product ID',
    })
  }

  try {
    const results = await req.database('reviews').where({ productId })
    return res.send(results)
  } catch (err) {
    return res.status(500).send({
      message: 'Failed to get reviews',
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
    return res.status(500).send({
      message: 'Failed to create review',
    })
  }
})


// start Express app server
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`)
})
