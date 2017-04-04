const express = require('express')
const router = express.Router()

let Product = require('../models/product')
Product.methods(['get', 'put', 'post', 'delete'])
Product.register(router, '/products')

let User = require('../models/user')
User.methods(['get', 'put', 'post', 'delete'])
User.register(router, '/users')

module.exports = router
