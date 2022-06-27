import AppError from "../../../shared/errors/AppError";
import IUsersRepository from "../../users/repositories/IUsersRepository";
import ICreatePiuDTO from "../dtos/ICreatePioDTO";
import Piu from "../entities/Piu";
import IPiusRepository from "../repositories/IPiuRepository";

class CreatePiuService {
  constructor(
    private readonly userRepository: IUsersRepository,
    private readonly piuRepository: IPiusRepository
  ) {}

  public async execute({ author, content }: ICreatePiuDTO): Promise<Piu> {
    const user = await this.userRepository.findById(author);

    if (!user) {
      throw new AppError("This is a unexisting user.");
    }

    const piu = await this.piuRepository.create({
      author,
      content
    });

    return piu;
  }
}

export default CreatePiuService;
