import User from "../entities/User";
import ICreateUserDTO from "../dto/ICreateUserDTO";

interface IUsersRepository {
  create({ username, email, password }: ICreateUserDTO): Promise<User>;

  delete(user: User): Promise<User>;

  followUser(user: User, followedUserId: string): Promise<User>;

  findUserById(id: string): Promise<User | null>;

  findUserByEmail(email: string): Promise<User | null>;

  findUserByUsername(username: string): Promise<User | null>;
}

export default IUsersRepository;