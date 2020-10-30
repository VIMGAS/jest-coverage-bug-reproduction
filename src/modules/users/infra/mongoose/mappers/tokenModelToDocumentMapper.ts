import Token from '@modules/users/models/Token';

import TokenModel, { TokenDocument } from '../schemas/Token';

export default function tokenModelToDocumentMapper(
  model: Token
): TokenDocument {
  return new TokenModel({
    token: model.token,
    userId: model.userId,
    type: model.type,
    createdBy: model.createdBy,
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
    deletedAt: model.deletedAt || undefined,
    expiresAt: model.expiresAt,
  });
}
