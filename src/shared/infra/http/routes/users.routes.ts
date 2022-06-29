import { Router } from 'express';
import { container } from 'tsyringe';

import MockHashProvider from '../../../../modules/users/providers/HashProvider/mocks/MockHashProvider';
import MockUsersRepository from '../../../../modules/users/repositories/MockUsersRepository';
import CreateUserService from '../../../../modules/users/services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { username, email, password } = request.body;

    const createUsers = container.resolve(CreateUserService);

    const user = await createUsers.execute({
      username,
      email,
      password
    });

    return response.json(user)
  } catch (err: any) {
    return response.status(400).json({error: err.message });
  }  
});

export default usersRouter;