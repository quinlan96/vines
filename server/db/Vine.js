const { Schema, Model } = require('mongoose')

const schema = Schema({
  title: String,
  description: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

export default Model('User', schema)