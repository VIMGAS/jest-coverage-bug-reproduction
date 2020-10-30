import 'reflect-metadata';

import Chance from 'chance';
import { v4 as uuid } from 'uuid';

import MongoDBMock from '@shared/infra/mongoose/fakes/MongoDBMock';

import { UserLevels } from '@modules/users/models/User';

import UserModel from '../../infra/mongoose/schemas/User';
import MongooseUsersRepository from './MongooseUsersRepository';

const faker = Chance();

const usersRepository = new MongooseUsersRepository();

describe('MongooseUsersRepository', () => {
  beforeAll(async () => {
    await MongoDBMock.connect();
  });

  afterAll(async () => {
    await MongoDBMock.disconnect();
  });

  it('should get a user by id', async () => {
    const user = await UserModel.create({
      _id: uuid(),
      firstName: faker.name(),
      lastName: faker.name(),
      email: faker.email(),
      level: UserLevels.User,
      password: null,
      confirmed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

    const foundUser = await usersRepository.getById(user._id);

    expect(foundUser).not.toBeNull();
    expect(foundUser?._id).toBe(user._id);
  });

  it('should get a user by email-confirmed tuple', async () => {
    const users = await Promise.all([
      UserModel.create({
        _id: uuid(),
        firstName: faker.name(),
        lastName: faker.name(),
        email: `${faker.email()}a`,
        level: UserLevels.User,
        password: null,
        confirmed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      }),
      UserModel.create({
        _id: uuid(),
        firstName: faker.name(),
        lastName: faker.name(),
        email: `${faker.email()}b`,
        level: UserLevels.User,
        password: null,
        confirmed: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      }),
      UserModel.create({
        _id: uuid(),
        firstName: faker.name(),
        lastName: faker.name(),
        email: `${faker.email()}c`,
        level: UserLevels.User,
        password: null,
        confirmed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      }),
    ]);

    const foundUser = await usersRepository.getByEmailAndConfirmed({
      email: users[1].email,
      confirmed: users[1].confirmed,
    });

    expect(foundUser).not.toBeNull();
    expect(foundUser?._id).toBe(users[1]._id);
  });
});
