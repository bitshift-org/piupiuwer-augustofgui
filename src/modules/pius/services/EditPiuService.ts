import { injectable, inject } from "tsyringe";

import AppError from "../../../shared/errors/AppError";
import IPiusRepository from "../repositories/IPiuRepository";

interface EditPiuDTO {
  id: string;
  newContent: string;
}

@injectable()
class EditPiuService {
  constructor(
    @inject("PiusRepository") private readonly piusRepository: IPiusRepository
  ) {}
  public async execute({ id, newContent }: EditPiuDTO) {
    const piu = await this.piusRepository.findById(id);

    if (!piu) {
      throw new AppError("A piu with this id was not found.", 404);
    }

    piu.content = newContent;

    const newPiu = await this.piusRepository.save(piu);

    return newPiu;
  }
}

export default EditPiuService;
