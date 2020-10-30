import 'reflect-metadata';

import Chance from 'chance';

import AppError from '@shared/errors/AppError';
import FakeLogger from '@shared/infra/logger/fakes/FakeLogger';
import MongoDBMock from '@shared/infra/mongoose/fakes/MongoDBMock';

import FakeHasher from '../infra/hasher/fakes/FakeHasher';
import UserModel from '../infra/mongoose/schemas/User';
import { UserLevels } from '../models/User';
import MongooseUsersRepository from '../repositories/implementations/MongooseUsersRepository';
import AuthenticateUserUseCase from './AuthenticateUserUseCase';

const faker = Chance();

const hasher = new FakeHasher();
const usersRepository = new MongooseUsersRepository();
const authenticateUser = new AuthenticateUserUseCase(
  FakeLogger,
  usersRepository,
  hasher
);

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

describe('AuthenticateUserUseCase', () => {
  beforeAll(async () => {
    await MongoDBMock.connect();
  });

  afterAll(async () => {
    await MongoDBMock.disconnect();
  });

  it('should authenticate a registered user', async () => {
    const registeredUser = await UserModel.create(buildUserData());

    const { token, user } = await authenticateUser.execute({
      email: registeredUser.email,
      password: registeredUser.password as string,
      requestId: faker.guid({ version: 4 }),
      requestingUserId: faker.guid({ version: 4 }),
    });

    expect(token).toBeTruthy();
    expect(user).toBeTruthy();
    expect(user._id).toBe(registeredUser._id);
  });

  it('should fail if email is not registered', async () => {
    const registeredUser = buildUserData();

    await expect(
      authenticateUser.execute({
        email: registeredUser.email,
        password: registeredUser.password as string,
        requestId: faker.guid({ version: 4 }),
        requestingUserId: faker.guid({ version: 4 }),
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should fail if user is not confirmed', async () => {
    const registeredUser = await UserModel.create(buildUserData(false));

    await expect(
      authenticateUser.execute({
        email: registeredUser.email,
        password: faker.string({ length: 20 }),
        requestId: faker.guid({ version: 4 }),
        requestingUserId: faker.guid({ version: 4 }),
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should fail if password is not correct', async () => {
    const registeredUser = await UserModel.create(buildUserData());

    await expect(
      authenticateUser.execute({
        email: registeredUser.email,
        password: faker.string({ length: 20 }),
        requestId: faker.guid({ version: 4 }),
        requestingUserId: faker.guid({ version: 4 }),
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
