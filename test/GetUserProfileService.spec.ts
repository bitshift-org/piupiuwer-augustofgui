import AppError from "@shared/errors/AppError";
import MockHashProvider from "@shared/containers/providers/HashProvider/mocks/MockHashProvider";
import MockUsersRepository from "@modules/users/repositories/MockUsersRepository";
import CreateUserService from "@modules/users/services/CreateUserService";
import GetUserProfileService from "@modules/users/services/GetUserProfileService";

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

  it('should not be able to get profile from an unexisting user', async () => {
    const { sut } = makeSut();

    expect(sut.execute("wrong_id")).rejects.toBeInstanceOf(AppError);
  });
});