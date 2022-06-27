import ICreateUserDTO from "../dtos/ICreateUserDTO";
import User from "../entities/User";
import IUsersRepository from "./IUsersRepository";

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

  public async save(user: User): Promise<User> {
    const userIndex = this.users.findIndex(item => item.id == user.id);
    this.users[userIndex] = user;

    return user;
  }

  public async addFollow(userId: string, followedUserId: string): Promise<User> {
    const user = this.users.find((user) => user.id === userId);
    
    if(!user) {
      return this.users[0];
    }

    user.follows.push(followedUserId);

    return user;
  }

  public async removeFollow(userId: string, followedUserId: string): Promise<User> {
    const user = this.users.find((user) => user.id === userId);
    
    if(!user) {
      return this.users[0];
    }

    user.follows.forEach((id, index) => {
      if (id === followedUserId) {
        user.follows.splice(index, 1);
        return user;
      }
    });

    return user;
  }

  public async findFollowedUser(userId: string, followedUserId: string): Promise<string | null> {
    const user = this.users.find((user) => user.id === userId);
    
    if(!user) {
      return null;
    }

    const foundFollow = user.follows.find((followId) => followId == followedUserId);

    return foundFollow || null;
  }

  public async findById(id: string): Promise<User | null> {
    const foundUser = this.users.find((user) => user.id === id);

    return foundUser || null;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const foundUser = this.users.find((user) => user.email === email);

    return foundUser || null;
  }

  public async findByUsername(username: string): Promise<User | null> {
    const foundUser = this.users.find((user) => user.username === username);

    return foundUser || null;
  }
}

export default MockUsersRepository;
