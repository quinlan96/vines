const { Schema, model } = require('mongoose')

const schema = Schema(
	{
		name: String,
		vines: [Schema.Types.ObjectId]
	},
	{
		timestamps: true
	}
)

module.exports = model('Playlist', schema)
