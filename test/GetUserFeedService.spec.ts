import AppError from "@shared/errors/AppError";
import MockHashProvider from "@shared/containers/providers/HashProvider/mocks/MockHashProvider";
import MockUsersRepository from "@modules/users/repositories/MockUsersRepository";
import CreateUserService from "@modules/users/services/CreateUserService";
import GetUserFeedService from "@modules/users/services/GetUserFeedService";
import MockPiusRepository from "@modules/pius/repositories/MockPiusRepository";
import FollowUserService from "@modules/users/services/FollowUserService";
import CreatePiuService from "@modules/pius/services/CreatePiuService";

const makeSut = (): {
  sut: GetUserFeedService;
  createUser: CreateUserService;
  createPiu: CreatePiuService;
  followUser: FollowUserService;
} => {
  const mockUsersRepository = new MockUsersRepository();
  const mockPiusRepository = new MockPiusRepository();
  const mockHashProvider = new MockHashProvider();

  const createUser = new CreateUserService(
    mockUsersRepository,
    mockHashProvider
  );

  const followUser = new FollowUserService(mockUsersRepository);
  const createPiu = new CreatePiuService(
    mockUsersRepository,
    mockPiusRepository
  );

  const sut = new GetUserFeedService(mockUsersRepository, mockPiusRepository);

  return { sut, createUser, createPiu, followUser };
};

describe("GetUserFeedService", () => {
  it("should successfully get the user feed", async () => {
    const { sut, createUser, createPiu, followUser } = makeSut();

    const user = await createUser.execute({
      username: "John Doe",
      email: "john@doe.com",
      password: "123456",
    });

    const otherUser = await createUser.execute({
      username: "John Dois",
      email: "john@dois.com",
      password: "123456",
    });

    await followUser.execute({
      ownerId: user.id,
      followedId: otherUser.id,
    });

    const piu = await createPiu.execute({
      author: otherUser.id,
      content: "Hi this is a test piu!",
    });

    const feed = await sut.execute(user.id);
    
    expect(feed).toContain(piu);
  });

  it('should not be able to get feed from an unexisting user', async () => {
    const { sut } = makeSut();

    expect(sut.execute("wrong_id")).rejects.toBeInstanceOf(AppError);
  });
});
