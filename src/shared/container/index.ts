import { container } from 'tsyringe';

import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ORMUsersRepository from '@modules/users/infra/typeorm/repositories/ORMUsersRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', ORMUsersRepository);
