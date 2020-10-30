import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';
import ILogger from '@shared/infra/logger/interfaces/ILogger';

import IHasher from '../infra/hasher/interfaces/IHasher';
import User from '../models/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
  requestingUserId: string;
  requestId: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('logger')
    private logger: ILogger,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('Hasher')
    private hasher: IHasher
  ) {}

  public async execute({
    email,
    password,
    requestingUserId,
    requestId,
  }: IRequest): Promise<{ token: string; user: User }> {
    this.logger.log('debug', 'Authorizing user', {
      email,
      requestingUserId,
      requestId,
    });

    const user = await this.usersRepository.getByEmailAndConfirmed({
      email,
      confirmed: true,
    });

    if (!user) {
      this.logger.log('debug', 'User does not exist.', {
        email,
        requestingUserId,
        requestId,
      });

      throw new AppError(
        'User not found',
        {
          code: 'INVALID_CREDENTIALS',
          message: 'E-mail ou senha inválidos.',
        },
        401
      );
    }

    this.logger.log('debug', 'User exists, comparing passwords.', {
      email,
      requestingUserId,
      requestId,
    });

    const isPasswordCorrect = await this.hasher.compareHash(
      password,
      user.password as string
    );
    if (!isPasswordCorrect) {
      this.logger.log('debug', 'Password is incorrect.', {
        email,
        requestingUserId,
        requestId,
      });

      throw new AppError(
        'User not found',
        {
          code: 'INVALID_CREDENTIALS',
          message: 'E-mail ou senha inválidos.',
        },
        401
      );
    }

    const token = sign(
      {
        ...user,
        password: undefined,
      },
      authConfig.secret,
      {
        subject: user._id,
        expiresIn: authConfig.session.expiresIn,
      }
    );

    return { token, user };
  }
}

export default AuthenticateUserUseCase;
