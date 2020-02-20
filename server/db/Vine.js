const { Schema, model } = require('mongoose')

const schema = Schema(
	{
		videoId: String,
		title: String,
		description: String,
		url: String,
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
