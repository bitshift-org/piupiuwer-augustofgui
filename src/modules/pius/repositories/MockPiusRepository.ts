import { v4 as uuidv4 } from "uuid";

import ICreatePiuDTO from "../dtos/ICreatePioDTO";
import Like from "../infra/typeorm/entities/Like";
import Piu from "../infra/typeorm/entities/Piu";
import IPiuRepository from "./IPiuRepository";

class MockPiusRepository implements IPiuRepository {
  private pius: Piu[] = [];
  private likes: Like[] = [];

  public async findById(id: string): Promise<Piu | null> {
    const foundPiu = this.pius.find((piu) => id === piu.id);

    return foundPiu || null;
  }

  public async findLike(piuId: string, userId: string): Promise<Like | null> {
    const foundLike = this.likes.find((like) => (piuId === like.piu_id, userId === like.user_id));

    return foundLike || null;
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

  public async like(piuId: string, userId: string): Promise<Like> {
    const like = new Like();
    
    like.id = uuidv4();
    like.piu_id = piuId;
    like.user_id = userId;

    this.likes.push(like);

    return like;
  }

  public async unlike(like: Like): Promise<Like>{
    this.likes.forEach((item, index) => {
      if (item === like) {
        this.likes.splice(index, 1);
        return item;
      }
    });

    return like;
  }
}

export default MockPiusRepository;
