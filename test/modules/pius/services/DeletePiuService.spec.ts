import AppError from "../../../shared/errors/AppError";
import MockHashProvider from "../../users/providers/HashProvider/mocks/MockHashProvider";
import MockUsersRepository from "../../users/repositories/MockUsersRepository";
import CreateUserService from "../../users/services/CreateUserService";
import MockPiusRepository from "../repositories/MockPiusRepository";
import CreatePiuService from "./CreatePiuService";
import DeletePiuService from "./DeletePiuService";

const makeSut = (): {
  mockPiusRepository: MockPiusRepository;
  createUserService: CreateUserService;
  createPiuService: CreatePiuService;
  sut: DeletePiuService;
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
  const sut = new DeletePiuService(mockPiusRepository);

  return { mockPiusRepository, createUserService, createPiuService, sut };
};

describe("DeletePiuService", () => {
  it("should successfully delete a piu", async () => {
    const { mockPiusRepository, createUserService, createPiuService, sut } =
      makeSut();

    const user = await createUserService.execute({
      username: "John Doe",
      email: "john@doe.com",
      password: "123456",
    });

    const piu = await createPiuService.execute({
      author: user.id,
      content: "Hi, my first piu here!",
    });

    const deletedPiu = await sut.execute(piu.id);

    expect(await mockPiusRepository.findById(piu.id)).toEqual(null);
  });

  it("should not delete a piu with a invalid id", async () => {
    const { sut } = makeSut();

    expect(sut.execute("invalidy_id")).rejects.toBeInstanceOf(AppError);
  });
});
