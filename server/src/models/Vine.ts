import { Schema, Document, Types, Model, model } from 'mongoose'
// import mongooseFuzzySearching from 'mongoose-fuzzy-searching'
import { ICreator } from './Creator'

type Id = Types.ObjectId

interface IVine extends Document {
	videoId: string
	title: string
	description: string
	url: string
	creator: Id | ICreator
}

const VineSchema: Schema = new Schema(
	{
		videoId: String,
		title: String,
		description: String,
		url: String,
		creator: {
			type: Schema.Types.ObjectId,
			ref: 'Creator'
		}
	},
	{
		timestamps: true,
		toObject: {
			virtuals: true
		},
		toJSON: {
			virtuals: true
		}
	},
)

VineSchema
	.virtual('vineUrl')
	.get(function() {
		return `${process.env.API_BASE}/static/vines/${this.videoId}/${this.videoId}.mp4`
	})

VineSchema
	.virtual('thumbnailUrl')
	.get(function() {
		return `${process.env.API_BASE}/static/vines/${this.videoId}/${this.videoId}.jpg`
	})

// schema.plugin(mongooseFuzzySearching, {
// 	fields: ['title', 'description']
// })

const Vine = model<IVine>('Vine', VineSchema)

export {
	Vine,
	IVine,
}