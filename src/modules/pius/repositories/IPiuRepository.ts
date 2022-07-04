import ICreatePiuDTO from "../dtos/ICreatePioDTO";
import Like from "../infra/typeorm/entities/Like";
import Piu from "../infra/typeorm/entities/Piu";

interface IPiusRepository {
  findById(id: string): Promise<Piu | null>;

  findLike(piuId: string, userId: string): Promise<Like | null>;

  create({ author, content }: ICreatePiuDTO): Promise<Piu>;

  delete(piu: Piu): Promise<Piu>;

  save(piu: Piu): Promise<Piu>;

  like(piuId: string, userId: string): Promise<Like>;

  unlike(like: Like): Promise<Like>;

  findAllPius(id: string): Promise<Piu[]>;
}

export default IPiusRepository;