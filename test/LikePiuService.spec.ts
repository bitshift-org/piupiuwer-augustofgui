import AppError from "@shared/errors/AppError";
import MockHashProvider from "@shared/containers/providers/HashProvider/mocks/MockHashProvider";
import MockUsersRepository from "@modules/users/repositories/MockUsersRepository";
import CreateUserService from "@modules/users/services/CreateUserService";
import MockPiusRepository from "@modules/pius/repositories/MockPiusRepository";
import CreatePiuService from "@modules/pius/services/CreatePiuService";
import LikePiuService from "@modules/pius/services/LikePiuService";

const makeSut = (): {
  createUserService: CreateUserService;
  createPiuService: CreatePiuService;
  sut: LikePiuService;
} => {
  const mockUsersRepository = new MockUsersRepository();
  const mockPiusRepository = new MockPiusRepository();
  const mockHashProvider = new MockHashProvider();
  const createUserService = new CreateUserService(
    mockUsersRepository,
    mockHashProvider
  );
  const createPiuService = new CreatePiuService(
    mockUsersRepository,
    mockPiusRepository
  );
  const sut = new LikePiuService(mockUsersRepository, mockPiusRepository);

  return { createUserService, createPiuService, sut };
};

describe("LikePiuService", () => {
  it("should successfully like an piu", async () => {
    const { createUserService, createPiuService, sut } = makeSut();

    const user = await createUserService.execute({
      username: "John Doe",
      email: "john@doe.com",
      password: "123456",
    });

    const otherUser = await createUserService.execute({
      username: "John Dois",
      email: "john@dois.com",
      password: "123456",
    });

    const piu = await createPiuService.execute({
      author: user.id,
      content: "This is a test.",
    });

    const { like, status} = await sut.execute({
      piuId: piu.id,
      userId: otherUser.id,
    });

    expect(status).toEqual("liked");
  });

  it("should not be able to like a piu with a invalidy user id", async () => {
    const { sut } = makeSut();

    expect(
      sut.execute({
        piuId: "any_id",
        userId: "wrong_id",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to like a piu with a invalidy piu id", async () => {
    const { createUserService, sut } = makeSut();

    const user = await createUserService.execute({
      username: "John Doe",
      email: "john@doe.com",
      password: "123456",
    });

    expect(
      sut.execute({
        piuId: "any_id",
        userId: user.id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
