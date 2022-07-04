import { injectable, inject } from "tsyringe";

import AppError from "../../../shared/errors/AppError";
import IUsersRepository from "../../users/repositories/IUsersRepository";
import ICreatePiuDTO from "../dtos/ICreatePioDTO";
import Piu from "../infra/typeorm/entities/Piu";
import IPiusRepository from "../repositories/IPiuRepository";

@injectable()
class CreatePiuService {
  constructor(
    @inject('UsersRepository')
    private readonly userRepository: IUsersRepository,

    @inject('PiusRepository')
    private readonly piusRepository: IPiusRepository
  ) {}

  public async execute({ author, content }: ICreatePiuDTO): Promise<Piu> {
    const user = await this.userRepository.findById(author);

    if (!user) {
      throw new AppError("An user with this id was not found.", 404);
    }

    const piu = await this.piusRepository.create({
      author,
      content
    });

    return piu;
  }
}

export default CreatePiuService;
