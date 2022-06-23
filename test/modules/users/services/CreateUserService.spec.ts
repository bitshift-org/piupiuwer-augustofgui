import AppError from "../../../shared/errors/AppError";
import MockHashProvider from "../providers/HashProvider/mocks/MockHashProvider";
import MockUsersRepository from "../repositories/MockUsersRepository";
import CreateUserService from "./CreateUserService";

const makeSut = (): CreateUserService => {
  const mockUsersRepository = new MockUsersRepository();
  const hashProvider = new MockHashProvider();
  const sut = new CreateUserService(mockUsersRepository, hashProvider);

  return sut;
};

describe("CreateUserService", () => {
  it("should successfully create a new user", async () => {
    const sut = makeSut();

    const user = await sut.execute({
      username: "John Doe",
      email: "johndoe@mail.com",
      password: "123456",
    });

    expect(user).toHaveProperty("id");
  });

  it("should not be able to create two users with the same email", async () => {
    const sut = makeSut();

    await sut.execute({
      username: "John Doe",
      email: "john@doe.com",
      password: "123456",
    });

    expect(
      sut.execute({
        username: "John Dois",
        email: "john@doe.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create two users with the same username", async () => {
    const sut = makeSut();

    await sut.execute({
      username: "John Doe",
      email: "john@do.com",
      password: "123456",
    });

    expect(
      sut.execute({
        username: "John Doe",
        email: "john@dois.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
