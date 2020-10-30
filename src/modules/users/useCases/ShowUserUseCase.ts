import { container, inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ILogger from '@shared/infra/logger/interfaces/ILogger';

import User from '../models/User';
import CheckIfUserExists from './CheckIfUserExistsUseCase';

interface IRequest {
  requestedUserId: string;
  requestingUserId: string;
  requestId: string;
}

@injectable()
class ShowUserUseCase {
  constructor(
    @inject('logger')
    private logger: ILogger
  ) {}

  public async execute({
    requestedUserId,
    requestingUserId,
    requestId,
  }: IRequest): Promise<User> {
    this.logger.log('info', 'Showing a User', {
      requestedUserId,
      requestingUserId,
      requestId,
    });

    const checkIfUserExists = container.resolve(CheckIfUserExists);
    const doesUserExist = await checkIfUserExists.execute({
      id: requestedUserId,
    });

    if (!doesUserExist) {
      this.logger.log('info', 'Requested user does not exist.', {
        requestedUserId,
        requestingUserId,
        requestId,
      });

      throw new AppError('User not found', {}, 404);
    }

    this.logger.log('info', 'User found.', {
      requestedUserId,
      requestingUserId,
      requestId,
    });

    return doesUserExist as User;
  }
}

export default ShowUserUseCase;
