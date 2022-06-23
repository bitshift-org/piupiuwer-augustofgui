import { sign } from "jsonwebtoken";
import authConfig from "../../../config/auth";

import User from "../entities/User";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";
import IUsersRepository from "../repositories/IUserRepository";
import AppError from "../../../shared/errors/AppError";

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
  }

class AuthenticateUserService {
    constructor(private readonly usersRepository: IUsersRepository, private readonly hashProvider : IHashProvider) {}

    public async execute({ email, password }: Request): Promise<Response> {
        const user = await this.usersRepository.findUserByEmail(email);

        if (!user) {
            throw new AppError("Incorrect email/password combination.", 401);
        }

        const passwordMatched = await this.hashProvider.compareHash(password, user.password);

        if (!passwordMatched) {
            throw new AppError("Incorrect email/password combination.", 401);
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        return {
            user,
            token,
        };
    }
}

export default AuthenticateUserService;