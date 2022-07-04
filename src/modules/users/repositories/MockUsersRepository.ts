import { v4 as uuidv4 } from "uuid";

import ICreateUserDTO from "../dtos/ICreateUserDTO";
import Subscription from "../infra/typeorm/entities/Subscription";
import User from "../infra/typeorm/entities/User";
import IUsersRepository from "./IUsersRepository";

class MockUsersRepository implements IUsersRepository {
  private users: User[] = [];
  private subscriptions: Subscription[] = [];

  public async create({
    username,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    user.id = uuidv4();
    user.username = username;
    user.email = email;
    user.password = password;
    user.created_at = new Date();
    user.updated_at = new Date();

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
    const userIndex = this.users.findIndex((item) => item.id == user.id);
    this.users[userIndex] = user;

    return user;
  }

  public async follow(
    ownerId: string,
    followedId: string
  ): Promise<Subscription> {
    const subscription = new Subscription();

    subscription.id = uuidv4();
    subscription.owner_id = ownerId;
    subscription.followed_id = followedId;
    subscription.created_at = new Date();

    this.subscriptions.push(subscription);

    return subscription;
  }

  public async unfollow(subscription: Subscription): Promise<Subscription> {
    this.subscriptions.forEach((item, index) => {
      if (item === subscription) {
        this.subscriptions.splice(index, 1);
        return item;
      }
    });
    return subscription;
  }

  public async findSubscription(
    ownerId: string,
    followedId: string
  ): Promise<Subscription | null> {
    const user = this.users.find((user) => user.id === ownerId);

    if (!user) {
      return null;
    }

    const subscription = this.subscriptions.find(
      (subscription) => (
        subscription.owner_id === ownerId,
        subscription.followed_id === followedId
      )
    );

    return subscription || null;
  }

  public async findAllSubscriptions(id: string): Promise<Subscription[]> {
    const user = this.users.find((user) => user.id === id);

    const subscriptions: Subscription[] = [];

    if (!user) {
      return subscriptions;
    }

    this.subscriptions.forEach((item) => {
      if (item.owner_id === id) {
        subscriptions.push(item);
      }
    });
    
    return subscriptions;
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
