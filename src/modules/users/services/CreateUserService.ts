import AppError from "../../../shared/errors/AppError";
import ICreateUserDTO from "../dtos/ICreateUserDTO";
import User from "../infra/typeorm/entities/User";
import IHashProvider from "@shared/containers/providers/HashProvider/models/IHashProvider";
import IUsersRepository from "../repositories/IUsersRepository";

import { injectable, inject } from 'tsyringe'; 

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
    @inject('HashProvider')
    private readonly hashProvider: IHashProvider
  ) {}

  public async execute({
    username,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const userEmailAlredyExists = await this.usersRepository.findByEmail(
      email
    );

    if (userEmailAlredyExists) {
      throw new AppError("Email address already used.");
    }

    const userUserNameAlredyExists =
      await this.usersRepository.findByUsername(username);

    if (userUserNameAlredyExists) {
      throw new AppError("Username already used.");
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
