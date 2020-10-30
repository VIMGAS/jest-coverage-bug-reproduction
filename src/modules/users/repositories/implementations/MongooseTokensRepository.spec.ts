import 'reflect-metadata';

// import Chance from 'chance';
import { v4 as uuid } from 'uuid';

import MongoDBMock from '@shared/infra/mongoose/fakes/MongoDBMock';

import { TokenTypes } from '@modules/users/models/Token';

import TokenModel from '../../infra/mongoose/schemas/Token';
import MongooseTokensRepository from './MongooseTokensRepository';

// const faker = Chance();

const tokensRepository = new MongooseTokensRepository();

describe('MongooseTokensRepository', () => {
  beforeAll(async () => {
    await MongoDBMock.connect();
  });

  afterAll(async () => {
    await MongoDBMock.disconnect();
  });

  it('should get a token by token', async () => {
    const token = await TokenModel.create({
      _id: uuid(),
      token: 'token',
      userId: uuid(),
      type: TokenTypes.PasswordReset,
      createdBy: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      expiresAt: new Date('2099-01-01'),
    });

    const foundToken = await tokensRepository.getByToken(token.token);

    expect(foundToken).not.toBeNull();
    expect(foundToken?.token).toBe(token.token);
  });

  it('should create a new token by token', async () => {
    const createdToken = await tokensRepository.create({
      token: 'some-token',
      userId: uuid(),
      type: TokenTypes.PasswordReset,
      createdBy: uuid(),
    });

    const foundToken = await TokenModel.findOne({ _id: createdToken._id });

    expect(foundToken).not.toBeNull();
    expect(foundToken?.token).toBe(createdToken.token);
    expect(foundToken?._id).toBe(createdToken._id);
  });
});
