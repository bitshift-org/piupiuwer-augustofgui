import AppError from "@shared/errors/AppError";
import MockHashProvider from "@shared/containers/providers/HashProvider/mocks/MockHashProvider";
import MockUsersRepository from "@modules/users/repositories/MockUsersRepository";
import CreateUserService from "@modules/users/services/CreateUserService";
import FollowUserService from "@modules/users/services/FollowUserService";

const makeSut = (): {
  sut: FollowUserService;
  createUser: CreateUserService;
} => {
  const mockUsersRepository = new MockUsersRepository();
  const mockHashProvider = new MockHashProvider();

  const createUser = new CreateUserService(
    mockUsersRepository,
    mockHashProvider
  );

  const sut = new FollowUserService(mockUsersRepository);

  return { sut, createUser };
};

describe("UnfollowUserService", () => {
  it("should successfully unfollow user", async () => {
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

    await sut.execute({
      ownerId: user.id,
      followedId: otherUser.id,
    });

    const response = await sut.execute({
      ownerId: user.id,
      followedId: otherUser.id,
    });

    expect(response.status).toEqual("unfollow");
  });

  it("should not be able to unfollow if the user don't exists", async () => {
    const { sut } = makeSut();

    expect(
      sut.execute({
        ownerId: "wrong_id",
        followedId: "any",
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
        ownerId: user.id,
        followedId: "wrong_id",
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

    const response = await sut.execute({
      ownerId: user.id,
      followedId: otherUser.id,
    });

    expect(response).not.toEqual("unfollow");
  });
});
