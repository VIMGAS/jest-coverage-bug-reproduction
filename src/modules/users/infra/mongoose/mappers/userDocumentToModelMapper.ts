import User from '@modules/users/models/User';

import { UserDocument } from '../schemas/User';

export default function userDocumentToModelMapper(
  document: UserDocument
): User {
  return {
    _id: document._id,
    firstName: document.firstName,
    lastName: document.lastName,
    email: document.email,
    confirmed: document.confirmed,
    password: document.password || undefined,
    level: document.level,
    createdAt: document.createdAt,
    updatedAt: document.updatedAt,
    deletedAt: document.deletedAt || undefined,
  };
}
