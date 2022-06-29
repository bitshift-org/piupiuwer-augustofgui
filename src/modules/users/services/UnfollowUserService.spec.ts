import AppError from "../../../shared/errors/AppError";
import MockHashProvider from "../../../shared/containers/providers/HashProvider/mocks/MockHashProvider";
import MockUsersRepository from "../repositories/MockUsersRepository";
import CreateUserService from "./CreateUserService";
import FollowUserService from "./FollowUserService";
import UnfollowUserService from "./UnfollowUserService";

const makeSut = (): {
  sut: UnfollowUserService;
  createUser: CreateUserService;
  followUser: FollowUserService;
} => {
  const mockUsersRepository = new MockUsersRepository();
  const mockHashProvider = new MockHashProvider();

  const createUser = new CreateUserService(
    mockUsersRepository,
    mockHashProvider
  );

  const followUser = new FollowUserService(mockUsersRepository);
  const sut = new UnfollowUserService(mockUsersRepository);

  return { sut, createUser, followUser };
};

describe("UnfollowUserService", () => {
  it("should successfully unfollow user", async () => {
    const { sut, createUser, followUser } = makeSut();

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

    await followUser.execute({
      userId: user.id,
      followedUserId: otherUser.id,
    });

    const updatedUser = await sut.execute({
      userId: user.id,
      followedUserId: otherUser.id,
    });

    expect(updatedUser.follows).not.toContain(otherUser);
  });

  it("should not be able to unfollow if the user don't exists", async () => {
    const { sut } = makeSut();

    expect(
      sut.execute({
        userId: "wrong_id",
        followedUserId: "any",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to unfollow an unexisting user", async () => {
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

  it("should not be able to unfollow an user that it don't alredy follows", async () => {
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

    expect(
      sut.execute({
        userId: user.id,
        followedUserId: otherUser.id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
