import { compare, hash } from 'bcryptjs';

import IHasher from '../../interfaces/IHasher';

export default class BCryptHasher implements IHasher {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 10);
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
