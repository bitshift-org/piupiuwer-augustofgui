import AppError from "../../../shared/errors/AppError";
import MockHashProvider from "../../../shared/containers/providers/HashProvider/mocks/MockHashProvider";
import MockTokenProvider from "../../../shared/containers/providers/TokenProvider/mocks/MockTokenProvider";
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

describe("FollowUserService", () => {
  it("should successfully follow user", async () => {
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

    expect(updatedUser.follows).toContain(otherUser);
  });

  it("should not be able to follow if the user don't exists", async () => {
    const { sut, createUser } = makeSut();

    expect(
      sut.execute({
        userId: "wrong_id",
        followedUserId: "any",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to follow an unexisting user", async () => {
    const { sut, createUser } = makeSut();

    const user = await createUser.execute({
      username: "John Doe",
      email: "john@doe.com",
      password: "123456",
    });

    expect(
      sut.execute({
        userId: user.id,
        followedUserId: "wrong_id",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to follow a user if it alredy follows that user", async () => {
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
