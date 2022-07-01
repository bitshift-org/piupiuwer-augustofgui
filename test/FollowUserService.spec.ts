import AppError from "@shared/errors/AppError";
import MockHashProvider from "@shared/containers/providers/HashProvider/mocks/MockHashProvider";
import MockTokenProvider from "@shared/containers//providers/TokenProvider/mocks/MockTokenProvider";
import MockUsersRepository from "@modules/users/repositories/MockUsersRepository";
import CreateUserService from "@modules/users/services/CreateUserService";
import FollowUserService from "@modules/users/services/FollowUserService";

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

    const response = await sut.execute({
      ownerId: user.id,
      followedId: otherUser.id,
    });

    expect(response.status).toEqual("follow");
  });

  it("should not be able to follow if the user don't exists", async () => {
    const { sut, createUser } = makeSut();

    expect(
      sut.execute({
        ownerId: "wrong_id",
        followedId: "any",
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
        ownerId: user.id,
        followedId: "wrong_id",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
