import ICreatePiuDTO from "../dto/ICreatePioDTO";
import Piu from "../entities/Piu";

interface IPiusRepository {
  create({ author, content }: ICreatePiuDTO): Promise<Piu>;
}

export default IPiusRepository;