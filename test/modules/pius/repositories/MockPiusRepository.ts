import ICreatePiuDTO from "../dto/ICreatePioDTO";
import Piu from "../entities/Piu";
import IPiuRepository from "./IPiuRepository";

class MockPiusRepository implements IPiuRepository {
  private pius: Piu[] = [];

  public async create({ author, content }: ICreatePiuDTO): Promise<Piu> {
    const piu = new Piu({ author, content });

    this.pius.push(piu);

    return piu;
  }
}

export default MockPiusRepository;
