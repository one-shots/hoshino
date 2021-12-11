// Server entry point is here
const { PORT } = require('./config')
const express = require('express')
const app = express()
const knexFile = require('./knexfile')

// Add database to request's context
app.use(function(req, res, next) {
  req.database = require('knex')(knexFile)
  next()
})

app.get('/products', async (req, res) => {
  res.send('Hello World!')
})

app.get('/reviews', (req, res) => {
  res.send('Hello World!')
})


// start Express app server
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`)
})
