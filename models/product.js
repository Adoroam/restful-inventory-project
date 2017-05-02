const restful = require('node-restful')
const mongoose = restful.mongoose

// NOTE: SCHEMA
let productSchema = new mongoose.Schema({
  name: String,
  sku: String,
  price: Number,
  qty: Number
})

// NOTE: RETURN MODEL
module.exports = restful.model('Products', productSchema)
