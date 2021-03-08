import { Schema, Document, Types, model } from 'mongoose'
import fs from 'fs'

type Id = Types.ObjectId

interface ICreator extends Document{
	creatorId: string
	username: string
	url: string
}

const CreatorSchema = new Schema(
	{
		creatorId: String,
		username: String,
		url: String
	},
	{
		timestamps: true,
		toObject: {
			virtuals: true
		},
		toJSON: {
			virtuals: true
		}
	}
)

CreatorSchema
	.virtual('vines', {
		ref: 'Vine',
		localField: '_id',
		foreignField: 'creator',
	})

CreatorSchema
	.virtual('thumbnailUrl')
	.get(function() {
		if(fs.existsSync(`${process.env.DATA_DIR}/creators/${this.creatorId}/${this.creatorId}.jpg`)) {
			return `${process.env.API_BASE}/static/creators/${this.creatorId}/${this.creatorId}.jpg`
		}

		return null
	})

const Creator = model<ICreator>('Creator', CreatorSchema)

export {
	Creator,
	ICreator,
}