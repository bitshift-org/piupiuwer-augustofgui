import AppError from "../../../shared/errors/AppError";
import User from "../entities/User";
import IUsersRepository from "../repositories/IUserRepository";

class DeleteUserService {
    constructor(private readonly usersRepository: IUsersRepository) { }

    async execute(id: string): Promise<User> {
        const userFound = await this.usersRepository.findUserById(id);

        if (!userFound) {
            throw new AppError("User with this id not found.");
        }

        const user = await this.usersRepository.delete(userFound);

        return user;
    }
}

export default DeleteUserService;