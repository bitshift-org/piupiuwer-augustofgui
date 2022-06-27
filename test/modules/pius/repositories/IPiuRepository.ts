import ICreatePiuDTO from "../dtos/ICreatePioDTO";
import Piu from "../entities/Piu";

interface IPiusRepository {
  findById(id: string): Promise<Piu | null>;

  create({ author, content }: ICreatePiuDTO): Promise<Piu>;

  save(piu: Piu): Promise<Piu>;
}

export default IPiusRepository;