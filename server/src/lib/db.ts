/**
 * @file Initialises the MongoDB connection.
 */

import mongoose from 'mongoose'

const uri = process.env.MONGODB_CONNECTION_STRING

export default function connect() {
	return mongoose.connect(uri)
}
