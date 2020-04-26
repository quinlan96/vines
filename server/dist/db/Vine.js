"use strict";

var _require = require('mongoose'),
    Schema = _require.Schema,
    model = _require.model;

var schema = Schema({
  title: String,
  description: String,
  url: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});
module.exports = model('Vine', schema);