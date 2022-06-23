import ICreateUserDTO from "../dto/ICreateUserDTO";
import User from "../entities/User";
import IUsersRepository from "./IUserRepository";

class MockUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create({ username, email, password }: ICreateUserDTO): Promise<User> {
    const user = new User({ username, email, password});

    this.users.push(user);

    return user;
  }

  public async findUserByEmail(email: string): Promise<User | null> {
    const foundUser = this.users.find(user => user.email === email);

    return foundUser || null;
  }

  public async findUserByUsername(username: string): Promise<User | null> {
    const foundUser = this.users.find(user => user.username === username);

    return foundUser || null;
  }

}

export default MockUsersRepository;
