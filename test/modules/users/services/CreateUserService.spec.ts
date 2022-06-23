import MockUsersRepository from '../repositories/MockUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUserService', () => {
    it('should successfully create a new user', async () => {
        const mockUsersRepository = new MockUsersRepository();
        const sut = new CreateUserService(mockUsersRepository);

        const user = await sut.execute({
            username: 'John Doe',
            email: 'johndoe@mail.com',
            password: '123456'
        });

        expect(user).toHaveProperty("id");
    });

    it("should not be able to create two users with the same email", async () => {
        const mockUsersRepository = new MockUsersRepository();
        const sut = new CreateUserService(mockUsersRepository);

        await sut.execute({
            username: 'John Doe',
            email: 'john@doe.com',
            password: '123456',
        });

        expect(
            sut.execute({
                username: 'John Dois',
                email: 'john@doe.com',
                password: '123456',
            })
        ).rejects.toBeInstanceOf(Error);
    });

    it("should not be able to create two users with the same username", async () => {
        const mockUsersRepository = new MockUsersRepository();
        const sut = new CreateUserService(mockUsersRepository);

        await sut.execute({
            username: 'John Doe',
            email: 'john@do.com',
            password: '123456',
        });

        expect(
            sut.execute({
                username: 'John Doe',
                email: 'john@dois.com',
                password: '123456',
            })
        ).rejects.toBeInstanceOf(Error);
    });
});