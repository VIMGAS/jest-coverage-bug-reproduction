import Token from '@modules/users/models/Token';
import ITokensRepository from '@modules/users/repositories/ITokensRepository';

import tokenDocumentToModelMapper from '../../infra/mongoose/mappers/tokenDocumentToModelMapper';
import tokenModelToDocumentMapper from '../../infra/mongoose/mappers/tokenModelToDocumentMapper';
import TokenModel from '../../infra/mongoose/schemas/Token';

export default class MongooseTokensRepository implements ITokensRepository {
  public async getByToken(token: string): Promise<Token | null> {
    const tokenDocument = await TokenModel.findOne({
      token,
      deletedAt: null,
    });

    if (tokenDocument) return tokenDocumentToModelMapper(tokenDocument);
    return null;
  }

  async create(token: Token): Promise<Token> {
    const tokenModel = tokenModelToDocumentMapper(token);

    const tokenDocument = await tokenModel.save();

    return tokenDocumentToModelMapper(tokenDocument);
  }
}
