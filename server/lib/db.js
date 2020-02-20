/**
 * @file Initialises the MongoDB connection.
 */

const mongoose = require('mongoose')
const uri = process.env.MONGODB_CONNECTION_STRING
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	authSource: 'admin'
}

module.exports = function connect() {
	return mongoose.connect(uri, options)
}
