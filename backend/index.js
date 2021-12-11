const { PORT } = require('./config')
const express = require('express')
const app = express()
const port = 3000

app.get('/products', (req, res) => {
  res.send('Hello World!')
})

app.get('/reviews', (req, res) => {
  res.send('Hello World!')
})


// start Express app server
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`)
})
