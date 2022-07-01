import AppError from "@shared/errors/AppError";
import MockHashProvider from "@shared/containers/providers/HashProvider/mocks/MockHashProvider";
import MockUsersRepository from "@modules/users/repositories/MockUsersRepository";
import CreateUserService from "@modules/users/services/CreateUserService";
import MockPiusRepository from "@modules/pius/repositories/MockPiusRepository";
import CreatePiuService from "@modules/pius/services/CreatePiuService";

const makeSut = (): {
  createUserService: CreateUserService;
  sut: CreatePiuService;
} => {
  const mockUsersRepository = new MockUsersRepository();
  const mockPiusRepository = new MockPiusRepository();
  const mockHashProvider = new MockHashProvider();
  const createUserService = new CreateUserService(
    mockUsersRepository,
    mockHashProvider
  );
  const sut = new CreatePiuService(mockUsersRepository, mockPiusRepository);

  return { createUserService, sut };
};

describe("CreatePiuService", () => {
  it("should successfully create a new Piu", async () => {
    const { sut, createUserService } = makeSut();

    const user = await createUserService.execute({
      username: "John Doe",
      email: "john@doe.com",
      password: "123456",
    });

    const piu = await sut.execute({
      author: user.id,
      content: "Hi, my first piu here!",
    });

    expect(piu).toHaveProperty("id");
    expect(piu.author).toEqual(user.id);
  });

  it("should not be able to create a piu from an unexisting user", async () => {
    const { sut, createUserService } = makeSut();

    expect(
      sut.execute({
        author: "wrong_id",
        content: "Don't think i can post this here...",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
