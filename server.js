const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// NOTE: DATABASE
mongoose.connect('mongodb://localhost/bastion')

const app = express()
app.use(express.static(__dirname))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// NOTE: ROUTES
app.use('/api', require('./routes/api'))
app.get('/', (req, res) => {
  res.redirect('/dist/')
})

// NOTE: START SERVER
app.listen(80, () => { console.log(`server listening on port 80`) })
