const express = require('express')
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const app = express()

// DATABASE
mongoose.connect('mongodb://localhost/bastion')

app.use(express.static(__dirname))
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())

// ROUTES
app.use('/api', require('./routes/api'))
app.get('/', (req, res) => res.redirect('/'))
app.get('/:other', (req, res) => res.redirect(`/?re=${req.params.other}`))
app.get('/*', (req, res) => res.redirect('/'))

// START SERVER
const port = 80
app.listen(port, () => console.log(`server listening on port ${port}`))
