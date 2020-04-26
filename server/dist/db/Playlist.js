"use strict";

var _require = require('mongoose'),
    Schema = _require.Schema,
    model = _require.model;

var schema = Schema({
  name: String,
  vines: [Schema.Types.ObjectId]
}, {
  timestamps: true
});
module.exports = model('Playlist', schema);