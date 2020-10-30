import 'reflect-metadata';

import Chance from 'chance';
import { container } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import FakeLogger from '@shared/infra/logger/fakes/FakeLogger';
import ILogger from '@shared/infra/logger/interfaces/ILogger';
import MongoDBMock from '@shared/infra/mongoose/fakes/MongoDBMock';

import UserModel from '../infra/mongoose/schemas/User';
import User, { UserLevels } from '../models/User';
import MongooseUsersRepository from '../repositories/implementations/MongooseUsersRepository';
import IUsersRepository from '../repositories/IUsersRepository';
import ShowUserUseCase from './ShowUserUseCase';

container.registerInstance<ILogger>('logger', FakeLogger);
container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  MongooseUsersRepository
);

const faker = Chance();

const showUser = new ShowUserUseCase(FakeLogger);

const buildUserData = (confirmed = true) => ({
  email: faker.email(),
  firstName: faker.name(),
  lastName: faker.name(),
  password: confirmed ? faker.string({ length: 20 }) : null,
  confirmed,
  level: UserLevels.User,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
});

describe('CheckIfUserExistsUseCase', () => {
  beforeAll(async () => {
    await MongoDBMock.connect();
  });

  afterAll(async () => {
    await MongoDBMock.disconnect();
  });

  it('should authenticate a registered user', async () => {
    const registeredUser = await UserModel.create(buildUserData());

    const user = (await showUser.execute({
      requestedUserId: registeredUser._id,
      requestingUserId: faker.guid({ version: 4 }),
      requestId: faker.guid({ version: 4 }),
    })) as User;

    expect(user).toBeTruthy();
    expect(user._id).toBe(registeredUser._id);
    expect(user.email).toBe(registeredUser.email);
  });

  it('should fail if the user does not exist', async () => {
    await expect(
      showUser.execute({
        requestedUserId: faker.guid({ version: 4 }),
        requestingUserId: faker.guid({ version: 4 }),
        requestId: faker.guid({ version: 4 }),
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
