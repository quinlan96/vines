import { Schema, Document, Types, model } from 'mongoose';
import config from 'config';
// import mongooseFuzzySearching from 'mongoose-fuzzy-searching'
import { ICreator } from './Creator';

type Id = Types.ObjectId;

export interface IVine extends Document {
  videoId: string;
  title: string;
  description: string;
  url: string;
  creator: Id | ICreator;
  vineUrl: string;
  thumbnailUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const VineSchema: Schema = new Schema(
  {
    videoId: String,
    title: String,
    description: String,
    url: String,
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'Creator',
    },
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

VineSchema.virtual('vineUrl').get(function vineUrl(this: IVine) {
  const apiBase: string = config.get('apiBase');

  return `${apiBase}/storage/vines/${this.videoId}/${this.videoId}.mp4`;
});

VineSchema.virtual('thumbnailUrl').get(function thumbnailUrl(this: IVine) {
  const apiBase: string = config.get('apiBase');

  return `${apiBase}/storage/vines/${this.videoId}/${this.videoId}.jpg`;
});

// schema.plugin(mongooseFuzzySearching, {
// 	fields: ['title', 'description']
// })

export const Vine = model<IVine>('Vine', VineSchema);
