import mongoose, { Document, Schema, Model } from 'mongoose';
import { v4 as uuid } from 'uuid';

import { UserLevels, UserLevelsArray } from '@modules/users/models/User';

export type UserAttributes = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string | null;
  level: UserLevels;
  confirmed: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type UserDocument = Document & UserAttributes;

type UserModel = Model<UserDocument>;

const UserSchema = new Schema(
  {
    _id: { type: String, required: true, default: uuid },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    password: { type: String, required: false, default: null },
    confirmed: { type: Boolean, default: false },
    level: {
      type: String,
      required: true,
      enum: UserLevelsArray,
      default: UserLevels.User,
    },
    createdBy: { type: String, required: false, default: null },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now },
    deletedAt: { type: Date, default: null },
  },
  { collection: 'user', strict: true, timestamps: true, versionKey: false }
);

const UserMongooseModel = mongoose.model<UserDocument, UserModel>(
  'User',
  UserSchema
);

export default UserMongooseModel;
