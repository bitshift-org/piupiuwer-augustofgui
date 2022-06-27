import AppError from "../../../shared/errors/AppError";
import IPiusRepository from "../repositories/IPiuRepository";

interface EditPiuDTO {
  id: string,
  newContent: string
}

class EditPiuService {
  constructor(private readonly piusRepository: IPiusRepository){}

  public async execute({ id, newContent }: EditPiuDTO) {
    const piu = await this.piusRepository.findById(id);

    if(!piu){
      throw new AppError("Piu with this id was not found.");
    }

    piu.content = newContent;

    const newPiu = await this.piusRepository.save(piu);

    return newPiu;
  }
}

export default EditPiuService;