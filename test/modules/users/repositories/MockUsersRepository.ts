import ICreateUserDTO from "../dto/ICreateUserDTO";
import User from "../entities/User";
import IUsersRepository from "./IUserRepository";

class MockUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create({
    username,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User({ username, email, password });

    this.users.push(user);

    return user;
  }

  public async delete(user: User): Promise<User> {
    this.users.forEach((item, index) => {
      if (item === user) {
        this.users.splice(index, 1);
        return item;
      }
    });

    return user;
  }

  public async followUser(user: User, followedUserId: string): Promise<User> {
    this.users.forEach((item) => {
      if (item === user) {
        item.follows.push(followedUserId);
        return item;
      }
    });

    return user;
  }

  public async findUserById(id: string): Promise<User | null> {
    const foundUser = this.users.find((user) => user.id === id);

    return foundUser || null;
  }

  public async findUserByEmail(email: string): Promise<User | null> {
    const foundUser = this.users.find((user) => user.email === email);

    return foundUser || null;
  }

  public async findUserByUsername(username: string): Promise<User | null> {
    const foundUser = this.users.find((user) => user.username === username);

    return foundUser || null;
  }
}

export default MockUsersRepository;
