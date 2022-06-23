import MockHashProvider from "../providers/HashProvider/mocks/MockHashProvider";
import MockTokenProvider from "../providers/TokenProvider/mocks/MockTokenProvider";
import MockUsersRepository from "../repositories/MockUsersRepository";
import AuthenticateUserService from "./AuthenticateUserService";
import CreateUserService from "./CreateUserService";

describe("AuthenticateUserService", () => {
  it("should successfully authenticate user by email and password", async () => {
    const mockUsersRepository = new MockUsersRepository();
    const mockHashProvider = new MockHashProvider();
    const mockTokenProvider = new MockTokenProvider();

    const createUser = new CreateUserService(
      mockUsersRepository,
      mockHashProvider
    );
    const authenticateUser = new AuthenticateUserService(
      mockUsersRepository,
      mockHashProvider,
      mockTokenProvider
    );

    const user = await createUser.execute({
      username: "John Doe",
      email: "john@doe.com",
      password: "123456",
    });

    const response = await authenticateUser.execute({
      email: "john@doe.com",
      password: "123456",
    });

    expect(response).toHaveProperty("token");
    expect(response.user).toEqual(user);
  });
});
