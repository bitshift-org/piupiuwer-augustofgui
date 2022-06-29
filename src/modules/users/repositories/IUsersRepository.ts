import User from "../infra/typeorm/entities/User";
import ICreateUserDTO from "../dtos/ICreateUserDTO";

interface IUsersRepository {
  create({ username, email, password }: ICreateUserDTO): Promise<User>;

  delete(user: User): Promise<User>;

  save(user: User): Promise<User>;

  findById(id: string): Promise<User | null>;

  findByEmail(email: string): Promise<User | null>;

  findByUsername(username: string): Promise<User | null>;

  findFollowedUser(userId: string, followedUserId: string): Promise<User | null>;
}

export default IUsersRepository;