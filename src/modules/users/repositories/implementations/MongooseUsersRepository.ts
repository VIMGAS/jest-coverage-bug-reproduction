import User from '@modules/users/models/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import userDocumentToModelMapper from '../../infra/mongoose/mappers/userDocumentToModelMapper';
import UserModel from '../../infra/mongoose/schemas/User';

export default class MongooseUsersRepository implements IUsersRepository {
  public async getById(id: string): Promise<User | null> {
    const user = await UserModel.findOne({
      _id: id,
      deletedAt: null,
    });

    if (user) return userDocumentToModelMapper(user);
    return null;
  }

  public async getByEmailAndConfirmed({
    email,
    confirmed,
  }: {
    email: string;
    confirmed: boolean;
  }): Promise<User | null> {
    const user = await UserModel.findOne({
      email,
      confirmed,
      deletedAt: null,
    });

    if (user) return userDocumentToModelMapper(user);
    return null;
  }
}
