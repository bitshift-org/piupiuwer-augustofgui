import MockUsersRepository from "../repositories/MockUsersRepository";
import CreateUserService from "./CreateUserService";
import DeleteUserService from "./DeleteUserService";

describe('DeleteUserService', () => {
    it('should successfully delete a new user', async () => {
        const mockUsersRepository = new MockUsersRepository();
        const sut = new DeleteUserService(mockUsersRepository);
        const createUserService = new CreateUserService(mockUsersRepository);

        const user = await createUserService.execute({
            username: 'John Doe',
            email: 'johndoe@mail.com',
            password: '123456'
        });
        
        const deletedUser = await sut.execute(user.id);

        expect(deletedUser.id).toEqual(user.id);
    });

    it('should not delete a new user with a invalid id', async () => {
        const mockUsersRepository = new MockUsersRepository();
        const sut = new DeleteUserService(mockUsersRepository);
        
        expect(
            sut.execute('invalidy_id')
        ).rejects.toBeInstanceOf(Error);
    });
});