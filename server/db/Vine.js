const { Schema, model } = require('mongoose')

const schema = Schema(
	{
		title: String,
		description: String,
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		}
	},
	{
		timestamps: true
	}
)

module.exports = model('Vine', schema)
