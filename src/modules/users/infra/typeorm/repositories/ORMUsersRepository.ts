import { Repository } from "typeorm";

import PostgresDataSource from "@shared/infra/typeorm";

import ICreateUserDTO from "../../../dtos/ICreateUserDTO";
import IUsersRepository from "../../../repositories/IUsersRepository";
import User from "../entities/User";
import Subscription from "../entities/Subscription";

class ORMUsersRepository implements IUsersRepository {
  private usersRepository: Repository<User>;
  private subscriptionsRepository: Repository<Subscription>;

  constructor() {
    this.usersRepository = PostgresDataSource.getRepository(User);
    this.subscriptionsRepository =
      PostgresDataSource.getRepository(Subscription);
  }

  public async create({
    username,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.usersRepository.create({ username, email, password });

    await this.usersRepository.save(user);

    return user;
  }

  public async delete(user: User): Promise<User> {
    const deletedUser = await this.usersRepository.remove(user);

    return deletedUser;
  }

  public async save(user: User): Promise<User> {
    await this.usersRepository.save(user);

    return user;
  }

  public async follow(
    ownerId: string,
    followedId: string
  ): Promise<Subscription> {
    const subscription = this.subscriptionsRepository.create({
      owner_id: ownerId,
      followed_id: followedId,
    });

    await this.subscriptionsRepository.save(subscription);

    return subscription;
  }

  public async unfollow(subscription: Subscription): Promise<Subscription> {
    await this.subscriptionsRepository.remove(subscription);

    return subscription;
  }

  public async findSubscription(
    ownerId: string,
    followedId: string
  ): Promise<Subscription | null> {
    const foundSubscription = await this.subscriptionsRepository.findOne({
      where: {
        owner_id: ownerId,
        followed_id: followedId,
      },
    });

    return foundSubscription || null;
  }

  public async findAllSubscriptions(id: string): Promise<Subscription[]> {
    const foundSubscriptions = await this.subscriptionsRepository.find({ where: {
      owner_id: id
    }});

    return foundSubscriptions;
  }

  public async findById(id: string): Promise<User | null> {
    const foundUser = await this.usersRepository.findOneBy({ id: id });

    return foundUser || null;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const foundUser = await this.usersRepository.findOneBy({ email });

    return foundUser || null;
  }

  public async findByUsername(username: string): Promise<User | null> {
    const foundUser = await this.usersRepository.findOne({
      where: { username },
    });

    return foundUser || null;
  }
}

export default ORMUsersRepository;
