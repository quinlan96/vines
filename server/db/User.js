const { Schema, model } = require('mongoose')

const schema = Schema(
	{
		username: String,
		url: String
	},
	{
		timestamps: true
	}
)

module.exports = model('User', schema)
