const { Schema, Model } = require('mongoose')

const schema = Schema({
  username: String,
  url: String
}, {
  timestamps: true
})

export default Model('User', schema)