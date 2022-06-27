import AppError from "../../../shared/errors/AppError";
import MockHashProvider from "../../users/providers/HashProvider/mocks/MockHashProvider";
import MockUsersRepository from "../../users/repositories/MockUsersRepository";
import CreateUserService from "../../users/services/CreateUserService";
import MockPiusRepository from "../repositories/MockPiusRepository";
import CreatePiuService from "./CreatePiuService";
import EditPiuService from "./EditPiuService";

const makeSut = (): {
  createUserService: CreateUserService;
  createPiuService: CreatePiuService;
  sut: EditPiuService;
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
  const sut = new EditPiuService(mockPiusRepository);

  return { createUserService, createPiuService, sut };
};

describe("EditPiuService", () => {
  it("should successfully edit a existing piu", async () => {
    const { createUserService, createPiuService, sut } = makeSut();

    const user = await createUserService.execute({
      username: "John Doe",
      email: "john@doe.com",
      password: "123456",
    });

    const piu = await createPiuService.execute({
      author: user.id,
      content: "Hi, my first piu here!",
    });

    const editedPiu = await sut.execute({
      id: piu.id,
      newContent: "Sorry, this is an edit.",
    });

    expect(editedPiu.content).toEqual("Sorry, this is an edit.");
  });

  it("should not be able to edit an unexisting piu", async () => {
    const { sut } = makeSut();

    expect(sut.execute({
      id: "wrong_id",
      newContent: "any"
    })).rejects.toBeInstanceOf(AppError);
  });
});
