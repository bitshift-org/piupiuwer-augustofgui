import ICreatePiuDTO from "@modules/pius/dtos/ICreatePioDTO";
import IPiusRepository from "@modules/pius/repositories/IPiuRepository";
import PostgresDataSource from "@shared/infra/typeorm";
import { Repository } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import Like from "../entities/Like";
import Piu from "../entities/Piu";

class ORMPiusRepository implements IPiusRepository {
  private piusRepository: Repository<Piu>;
  private likesRepository: Repository<Like>;
  constructor() {
    this.piusRepository = PostgresDataSource.getRepository(Piu);
    this.likesRepository = PostgresDataSource.getRepository(Like);
  }

  public async findById(id: string): Promise<Piu | null> {
    const foundPiu = await this.piusRepository.findOneBy({ id });

    return foundPiu || null;
  }

  public async findLike(piuId: string, userId: string): Promise<Like | null> {
    const foundLike = await this.likesRepository.findOneBy({ piu_id: piuId, user_id: userId });

    return foundLike || null;
  }

  public async create({ author, content }: ICreatePiuDTO): Promise<Piu> {
    const piu = this.piusRepository.create({ author_id: author, content });

    await this.piusRepository.save(piu);

    return piu;
  }

  public async delete(piu: Piu): Promise<Piu> {
    const deletedPiu = await this.piusRepository.remove(piu);

    return deletedPiu;
  }

  public async save(piu: Piu): Promise<Piu> {
    await this.piusRepository.save(piu);

    return piu;
  }

  public async like(piuId: string, userId: string): Promise<Like> {
    const like = this.likesRepository.create({
      piu_id: piuId,
      user_id: userId
    });

    await this.likesRepository.save(like);

    return like;
  }

  public async unlike(like: Like): Promise<Like> {
    const deletedLike = await this.likesRepository.remove(like);

    return deletedLike;
  }
}

export default ORMPiusRepository;
