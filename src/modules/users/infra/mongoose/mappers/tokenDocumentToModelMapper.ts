import Token from '@modules/users/models/Token';

import { TokenDocument } from '../schemas/Token';

export default function tokenDocumentToModelMapper(
  document: TokenDocument
): Token {
  return {
    _id: document._id,
    token: document.token,
    userId: document.userId,
    type: document.type,
    createdBy: document.createdBy,
    createdAt: document.createdAt,
    updatedAt: document.updatedAt,
    deletedAt: document.deletedAt || undefined,
    expiresAt: document.expiresAt,
  };
}
