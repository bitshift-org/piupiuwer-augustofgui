import AppError from "../../../shared/errors/AppError";
import MockHashProvider from "../providers/HashProvider/mocks/MockHashProvider";
import MockUsersRepository from "../repositories/MockUsersRepository";
import CreateUserService from "./CreateUserService";
import GetUserProfileService from "./GetUserProfileService";

const makeSut = (): {
  sut: GetUserProfileService;
  createUser: CreateUserService;
} => {
  const mockUsersRepository = new MockUsersRepository();
  const mockHashProvider = new MockHashProvider();

  const createUser = new CreateUserService(
    mockUsersRepository,
    mockHashProvider
  );
  const sut = new GetUserProfileService(mockUsersRepository);

  return { sut, createUser };
};

describe('GetUserProfileService', () => {
  it('should successfully get the user profile information', async () => {
    const { sut, createUser } = makeSut();

    const user = await createUser.execute({
      username: "John Doe",
      email: "john@doe.com",
      password: "123456"
    });

    const userProfile = await sut.execute(user.id);
    
    expect(userProfile.id).toEqual(user.id);
    expect(userProfile.username).toEqual(user.username);
  });

  it('should not be able to get profile from unexisting user', async () => {
    const { sut } = makeSut();

    expect(sut.execute("wrong_id")).rejects.toBeInstanceOf(AppError);
  });
});