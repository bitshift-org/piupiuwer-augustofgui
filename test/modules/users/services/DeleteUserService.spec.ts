import AppError from "../../../shared/errors/AppError";
import MockHashProvider from "../providers/HashProvider/mocks/MockHashProvider";
import MockUsersRepository from "../repositories/MockUsersRepository";
import CreateUserService from "./CreateUserService";
import DeleteUserService from "./DeleteUserService";

const makeSut = () : { sut: DeleteUserService, mockUsersRepository: MockUsersRepository } => {
    const mockUsersRepository = new MockUsersRepository();
    const sut = new DeleteUserService(mockUsersRepository);

    return { sut, mockUsersRepository };
}

describe('DeleteUserService', () => {
    it('should successfully delete a new user', async () => {
        const { sut, mockUsersRepository } = makeSut();
        const hashProvider = new MockHashProvider();
        const createUserService = new CreateUserService(mockUsersRepository, hashProvider);

        const user = await createUserService.execute({
            username: 'John Doe',
            email: 'johndoe@mail.com',
            password: '123456'
        });
        
        const deletedUser = await sut.execute(user.id);

        expect(deletedUser.id).toEqual(user.id);
    });

    it('should not delete a new user with a invalid id', async () => {
        const { sut, mockUsersRepository } = makeSut();

        expect(
            sut.execute('invalidy_id')
        ).rejects.toBeInstanceOf(AppError);
    });
});