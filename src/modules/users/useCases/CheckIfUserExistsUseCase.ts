import { inject, injectable } from 'tsyringe';

import ILogger from '@shared/infra/logger/interfaces/ILogger';

import User from '../models/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  id: string;
}

@injectable()
class CheckIfUserExistsUseCase {
  constructor(
    @inject('logger')
    private logger: ILogger,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ id }: IRequest): Promise<User | boolean> {
    this.logger.log('debug', 'Checking if a User exists.', {
      id,
    });

    const userInDatabase = await this.usersRepository.getById(id);

    if (userInDatabase) {
      this.logger.log('debug', 'User exists.', {
        id,
      });

      return userInDatabase;
    }

    this.logger.log('debug', 'User does not exist.', {
      id,
    });

    return false;
  }
}

export default CheckIfUserExistsUseCase;
