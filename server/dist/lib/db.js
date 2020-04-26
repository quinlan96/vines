"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = connect;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file Initialises the MongoDB connection.
 */
console.log(process.env);
var uri = process.env.MONGODB_CONNECTION_STRING;
var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  authSource: 'admin'
};

function connect() {
  return _mongoose["default"].connect(uri, options);
}