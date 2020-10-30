import mongoose, { Document, Schema, Model } from 'mongoose';
import { v4 as uuid } from 'uuid';

import { TokenTypes, TokenTypesArray } from '@modules/users/models/Token';

export type TokenAttributes = {
  _id: string;
  token: string;
  userId: string;
  type: TokenTypes;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  expiresAt: Date;
};

export type TokenDocument = Document & TokenAttributes;

type TokenModel = Model<TokenDocument>;

const TokenSchema = new Schema(
  {
    _id: { type: String, required: true, default: uuid },
    token: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: TokenTypesArray,
    },
    userId: { type: String, required: true, ref: 'User' },
    createdBy: { type: String, required: false, default: null },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now },
    deletedAt: { type: Date, default: null },
    expiresAt: {
      type: Date,
      required: true,
      default: () => {
        const now = new Date();
        now.setTime(now.getTime() + 60 * 60 * 60 * 1000);
        return now;
      },
    },
  },
  { collection: 'token', strict: true, timestamps: true, versionKey: false }
);

const TokenMongooseModel = mongoose.model<TokenDocument, TokenModel>(
  'Token',
  TokenSchema
);

export default TokenMongooseModel;
