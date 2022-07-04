import { container } from 'tsyringe';

import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ORMUsersRepository from '@modules/users/infra/typeorm/repositories/ORMUsersRepository';

import IPiusRepository from '@modules/pius/repositories/IPiuRepository';
import ORMPiusRepository from '@modules/pius/infra/typeorm/repositories/ORMPiusRepository';

import ICommentsRepository from '@modules/comments/repositories/ICommentsRepository';
import ORMCommentsRepository from '@modules/comments/infra/typeorm/repositories/ORMCommentsRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', ORMUsersRepository);
container.registerSingleton<IPiusRepository>('PiusRepository', ORMPiusRepository);
container.registerSingleton<ICommentsRepository>('CommentsRepository', ORMCommentsRepository);
