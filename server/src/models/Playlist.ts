import { Schema, model } from 'mongoose'

const schema = new Schema(
	{
		name: String,
		vines: [Schema.Types.ObjectId]
	},
	{
		timestamps: true
	}
)

export default model('Playlist', schema)
