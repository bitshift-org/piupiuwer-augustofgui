import AppError from "../../../shared/errors/AppError";
import MockHashProvider from "../providers/HashProvider/mocks/MockHashProvider";
import MockTokenProvider from "../providers/TokenProvider/mocks/MockTokenProvider";
import MockUsersRepository from "../repositories/MockUsersRepository";
import CreateUserService from "./CreateUserService";
import FollowUserService from "./FollowUserService";

const makeSut = (): {
  sut: FollowUserService;
  createUser: CreateUserService;
} => {
  const mockUsersRepository = new MockUsersRepository();
  const mockHashProvider = new MockHashProvider();
  const mockTokenProvider = new MockTokenProvider();

  const createUser = new CreateUserService(
    mockUsersRepository,
    mockHashProvider
  );
  const sut = new FollowUserService(mockUsersRepository);

  return { sut, createUser };
};

describe("UnfollowUserService", () => {
  it("should successfully remove follow from user's follows array", async () => {
    const { sut, createUser } = makeSut();

    const user = await createUser.execute({
      username: "John Doe",
      email: "john@doe.com",
      password: "123456",
    });

    const otherUser = await createUser.execute({
      username: "Other John Doe",
      email: "other_john@doe.com",
      password: "other_123456",
    });

    const updatedUser = await sut.execute({
      userId: user.id,
      followedUserId: otherUser.id,
    });

    expect(user.follows);
  });
});
