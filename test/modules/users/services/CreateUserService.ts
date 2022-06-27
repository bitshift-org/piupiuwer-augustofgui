import AppError from "../../../shared/errors/AppError";
import ICreateUserDTO from "../dto/ICreateUserDTO";
import User from "../entities/User";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";
import IUsersRepository from "../repositories/IUsersRepository";

class CreateUserService {
  constructor(
    private readonly usersRepository: IUsersRepository,
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
