import MockHashProvider from "../../users/providers/HashProvider/mocks/MockHashProvider";
import MockUsersRepository from "../../users/repositories/MockUsersRepository";
import CreateUserService from "../../users/services/CreateUserService";
import MockPiusRepository from "../repositories/MockPiusRepository";
import CreatePiuService from "./CreatePiuService";

describe('CreatePiuService', () => {
  it('should successfully create a new Piu', async () => {
    const mockUsersRepository = new MockUsersRepository();
    const mockPiusRepository = new MockPiusRepository();
    const mockHashProvider = new MockHashProvider();
    const createUserService = new CreateUserService(mockUsersRepository, mockHashProvider);
    const sut = new CreatePiuService(mockUsersRepository, mockPiusRepository);

    const user = await createUserService.execute({
      username: "John Doe",
      email: "john@doe.com",
      password: "123456"
    });

    const piu = await sut.execute({
      author: user.id,
      content: "Hi, my first post here!"
    });

    expect(piu).toHaveProperty("id");
    expect(piu.author).toEqual(user.id);
  });
});