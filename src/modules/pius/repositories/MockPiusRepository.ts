import { v4 as uuidv4 } from "uuid";

import ICreatePiuDTO from "../dtos/ICreatePioDTO";
import Piu from "../infra/typeorm/entities/Piu";
import IPiuRepository from "./IPiuRepository";

class MockPiusRepository implements IPiuRepository {
  private pius: Piu[] = [];

  public async findById(id: string): Promise<Piu | null> {
    const foundPiu = this.pius.find((piu) => id === piu.id);

    return foundPiu || null;
  }

  public async create({ author, content }: ICreatePiuDTO): Promise<Piu> {
    const piu = new Piu();

    piu.id = uuidv4();
    piu.author_id = author;
    piu.content = content;

    this.pius.push(piu);

    return piu;
  }

  public async delete(piu: Piu): Promise<Piu> {
    this.pius.forEach((item, index) => {
      if (item === piu) {
        this.pius.splice(index, 1);
        return item;
      }
    });

    return piu;
  }
  
  public async save(piu: Piu): Promise<Piu> {
    const piuIndex = this.pius.findIndex(item => item.id == piu.id);
    this.pius[piuIndex] = piu;

    return piu;
  }
}

export default MockPiusRepository;
