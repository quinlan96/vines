"use strict";

var _require = require('mongoose'),
    Schema = _require.Schema,
    model = _require.model;

var schema = Schema({
  username: String,
  url: String
}, {
  timestamps: true
});
module.exports = model('User', schema);