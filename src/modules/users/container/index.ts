import { container } from 'tsyringe';

import BCryptHasher from '../infra/hasher/implementations/bcrypt/BCryptHasher';
import IHasher from '../infra/hasher/interfaces/IHasher';

container.registerSingleton<IHasher>('Hasher', BCryptHasher);
