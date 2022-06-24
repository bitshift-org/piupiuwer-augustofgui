import User from "../entities/User";
import ICreateUserDTO from "../dto/ICreateUserDTO";

interface IUsersRepository {
  create({ username, email, password }: ICreateUserDTO): Promise<User>;

  delete(user: User): Promise<User>;

  addFollow(userId: string, followedUserId: string): Promise<User>;

  removeFollow(userId: string, followedUserId: string): Promise<User>;

  findFollowedUser(userId: string, followedUserId: string): Promise<string | null>;

  findUserById(id: string): Promise<User | null>;

  findUserByEmail(email: string): Promise<User | null>;

  findUserByUsername(username: string): Promise<User | null>;
}

export default IUsersRepository;