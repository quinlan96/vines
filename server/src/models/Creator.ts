import { Schema, Document, Types, model } from 'mongoose';
import fs from 'fs';

type Id = Types.ObjectId;

export interface ICreator extends Document<Id> {
  creatorId: string;
  username: string;
  url: string;
}

const CreatorSchema = new Schema(
  {
    creatorId: String,
    username: String,
    url: String,
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

CreatorSchema.virtual('vines', {
  ref: 'Vine',
  localField: '_id',
  foreignField: 'creator',
});

CreatorSchema.virtual('thumbnailUrl').get(function thumbnailUrl(this: ICreator) {
  const dataDir = process.env.DATA_DIR ? process.env.DATA_DIR : '';
  const apiBase = process.env.API_BASE ? process.env.API_BASE : '';

  if (
    fs.existsSync(
      `${dataDir}/creators/${this.creatorId}/${this.creatorId}.jpg`
    )
  ) {
    return `${apiBase}/static/creators/${this.creatorId}/${this.creatorId}.jpg`;
  }

  return null;
});

export const Creator = model<ICreator>('Creator', CreatorSchema);
