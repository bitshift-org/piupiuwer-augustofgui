import AppError from "../../../shared/errors/AppError";
import MockHashProvider from "../providers/HashProvider/mocks/MockHashProvider";
import MockTokenProvider from "../providers/TokenProvider/mocks/MockTokenProvider";
import MockUsersRepository from "../repositories/MockUsersRepository";
import AuthenticateUserService from "./AuthenticateUserService";
import CreateUserService from "./CreateUserService";

const makeSut = (): {
  sut: AuthenticateUserService;
  createUser: CreateUserService;
} => {
  const mockUsersRepository = new MockUsersRepository();
  const mockHashProvider = new MockHashProvider();
  const mockTokenProvider = new MockTokenProvider();

  const createUser = new CreateUserService(
    mockUsersRepository,
    mockHashProvider
  );
  const sut = new AuthenticateUserService(
    mockUsersRepository,
    mockHashProvider,
    mockTokenProvider
  );

  return { sut, createUser };
};

describe("AuthenticateUserService", () => {
  it("should successfully authenticate user by email and password", async () => {
    const { sut, createUser } = makeSut();

    const user = await createUser.execute({
      username: "John Doe",
      email: "john@doe.com",
      password: "123456",
    });

    const response = await sut.execute({
      email: "john@doe.com",
      password: "123456",
    });

    expect(response).toHaveProperty("token");
    expect(response.user).toEqual(user);
  });

  it("should not authenticate user with wrong email", async () => {
    const { sut, createUser } = makeSut();

    const user = await createUser.execute({
      username: "John Doe",
      email: "john@doe.com",
      password: "123456",
    });

    expect(
      sut.execute({
        email: "wrong_email",
        password: "any",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not authenticate user with wrong password", async () => {
    const { sut, createUser } = makeSut();

    const user = await createUser.execute({
      username: "John Doe",
      email: "john@doe.com",
      password: "123456",
    });

    expect(
      sut.execute({
        email: "john@doe.com",
        password: "wrong_password",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
