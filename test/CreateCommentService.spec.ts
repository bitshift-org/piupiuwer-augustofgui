import AppError from "@shared/errors/AppError";
import CreateCommentService from "@modules/comments/services/CreateCommentService";
import MockCommentsRepository from "@modules/comments/repositories/MockCommentsRepository";
import MockHashProvider from "@shared/containers/providers/HashProvider/mocks/MockHashProvider";
import CreateUserService from "@modules/users/services/CreateUserService";
import MockUsersRepository from "@modules/users/repositories/MockUsersRepository";
import CreatePiuService from "@modules/pius/services/CreatePiuService";
import MockPiusRepository from "@modules/pius/repositories/MockPiusRepository";

const makeSut = (): {
  sut: CreateCommentService;
  createUser: CreateUserService;
  createPiu: CreatePiuService;
} => {
  const mockUsersRepository = new MockUsersRepository();
  const mockPiusRepository = new MockPiusRepository();
  const mockCommentsRepository = new MockCommentsRepository();
  const mockHashProvider = new MockHashProvider();
  const createUser = new CreateUserService(
    mockUsersRepository,
    mockHashProvider
  );
  const createPiu = new CreatePiuService(
    mockUsersRepository,
    mockPiusRepository
  );

  const sut = new CreateCommentService(mockCommentsRepository);

  return { sut, createUser, createPiu };
};

describe("CreateCommentService", () => {
  it("should successfully create a new comment", async () => {
    const { sut, createUser, createPiu } = makeSut();

    const user = await createUser.execute({
      username: "John Doe",
      email: "johndoe@mail.com",
      password: "123456",
    });

    const piu = await createPiu.execute({
      author: user.id,
      content: "Hi, my first piu here!",
    });

    const comment = await sut.execute({
      owner_id: piu.id,
      author: user.id,
      content: "My first comment here!",
    });

    console.log(comment);

    expect(comment).toHaveProperty("id");
    expect(comment.owner_id).toEqual(piu.id);
    expect(comment.author).toEqual(user.id);
    expect(comment.content).toEqual("My first comment here!");
  });
});
