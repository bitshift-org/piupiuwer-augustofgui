import User from '../entities/User';
import ICreateUserDTO from '../dto/ICreateUserDTO';

interface IUsersRepository {
  create({ username, email, password }: ICreateUserDTO): Promise<User>;

  findUserByEmail(email: string): Promise<User | null>;

  findUserByUsername(username: string): Promise<User | null>;

}

export default IUsersRepository;