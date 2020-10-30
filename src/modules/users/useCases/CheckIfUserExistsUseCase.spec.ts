import 'reflect-metadata';

import Chance from 'chance';

import FakeLogger from '@shared/infra/logger/fakes/FakeLogger';
import MongoDBMock from '@shared/infra/mongoose/fakes/MongoDBMock';

import UserModel from '../infra/mongoose/schemas/User';
import User, { UserLevels } from '../models/User';
import MongooseUsersRepository from '../repositories/implementations/MongooseUsersRepository';
import CheckIfUserExistsUseCase from './CheckIfUserExistsUseCase';

const faker = Chance();

const usersRepository = new MongooseUsersRepository();
const checkIfUserExists = new CheckIfUserExistsUseCase(
  FakeLogger,
  usersRepository
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

describe('CheckIfUserExistsUseCase', () => {
  beforeAll(async () => {
    await MongoDBMock.connect();
  });

  afterAll(async () => {
    await MongoDBMock.disconnect();
  });

  it('should authenticate a registered user', async () => {
    const registeredUser = await UserModel.create(buildUserData());

    const user = (await checkIfUserExists.execute({
      id: registeredUser._id,
    })) as User;

    expect(user).toBeTruthy();
    expect(user._id).toBe(registeredUser._id);
    expect(user.email).toBe(registeredUser.email);
  });

  it('should return false if the user does not exist', async () => {
    const user = await checkIfUserExists.execute({
      id: faker.guid({ version: 4 }),
    });

    expect(user).toBeFalsy();
    expect(user === false).toBeTruthy();
  });
});
