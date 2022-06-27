import User from "../entities/User";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";
import IUsersRepository from "../repositories/IUsersRepository";
import AppError from "../../../shared/errors/AppError";
import ITokenProvider from "../providers/TokenProvider/models/ITokenProvider";

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly hashProvider: IHashProvider,
    private readonly tokenProvider: ITokenProvider
  ) {}

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.usersRepository.findUserByEmail(email);

    if (!user) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password
    );

    if (!passwordMatched) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    const token = await this.tokenProvider.generateToken(user.id);

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
