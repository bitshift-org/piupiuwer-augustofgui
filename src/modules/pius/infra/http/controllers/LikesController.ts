import { Request, Response } from "express";
import { container } from "tsyringe";

import LikePiuService from "@modules/pius/services/LikePiuService";

class LikesController {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.user;
      const { piu_id } = request.body;

      const likePiu = container.resolve(LikePiuService);

      const responseLike = await likePiu.execute({
        piuId: piu_id,
        userId: id,
      });

      return response.json(responseLike);
    } catch (err: any) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export default LikesController;
