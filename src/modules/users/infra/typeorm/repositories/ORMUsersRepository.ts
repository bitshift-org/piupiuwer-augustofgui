import { Repository } from "typeorm";

import PostgresDataSource from "@shared/infra/typeorm";

import ICreateUserDTO from "../../../dtos/ICreateUserDTO";
import IUsersRepository from "../../../repositories/IUsersRepository";
import User from "../entities/User";

class ORMUsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = PostgresDataSource.getRepository(User);
  }

  public async create({
    username,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({ username, email, password });

    await this.ormRepository.save(user);

    return user;
  }

  public async delete(user: User): Promise<User> {
    const deleteUser = this.ormRepository.update(
      {
        deleted_at: new Date(),
      },
      user
    );

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    await this.ormRepository.save(user);

    return user;
  }

  public async findFollowedUser(
    userId: string,
    followedUserId: string
  ): Promise<User | null> {
    const user = await this.ormRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return null;
    }

    const foundFollow = user.follows.find((user) => user.id == followedUserId);

    return foundFollow || null;
  }

  public async findById(id: string): Promise<User | null> {
    const foundUser = await this.ormRepository.findOne({ where: { id } });

    return foundUser || null;
  }

  public async findByEmail(email: string): Promise<User | null> {
    console.log(email);
    const foundUser = await this.ormRepository.findOneBy({ email });
    console.log(foundUser);

    return foundUser || null;
  }

  public async findByUsername(username: string): Promise<User | null> {
    const foundUser = await this.ormRepository.findOne({ where: { username } });

    return foundUser || null;
  }
}

export default ORMUsersRepository;
