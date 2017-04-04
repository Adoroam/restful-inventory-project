const restful = require('node-restful')
const mongoose = restful.mongoose

// NOTE: SCHEMA
let userSchema = new mongoose.Schema({
  fName: String,
  lName: String,
  uName: String,
  hPass: String,
  phone: String,
  email: String,
  address: String,
  joined: Date
})

// NOTE: RETURN MODEL
module.exports = restful.model('User', userSchema)
