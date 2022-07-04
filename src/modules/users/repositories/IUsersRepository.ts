import User from "../infra/typeorm/entities/User";
import Subscription from "../infra/typeorm/entities/Subscription";
import ICreateUserDTO from "../dtos/ICreateUserDTO";

interface IUsersRepository {
  create({ username, email, password }: ICreateUserDTO): Promise<User>;

  delete(user: User): Promise<User>;

  save(user: User): Promise<User>;

  follow(ownerId: string, followedId: string): Promise<Subscription>;

  unfollow(subscription: Subscription): Promise<Subscription>;

  findById(id: string): Promise<User | null>;

  findByEmail(email: string): Promise<User | null>;

  findByUsername(username: string): Promise<User | null>;

  findSubscription(ownerId: string, followedId: string): Promise<Subscription | null>;

  findAllSubscriptions(id: string): Promise<Subscription[]>
}

export default IUsersRepository;