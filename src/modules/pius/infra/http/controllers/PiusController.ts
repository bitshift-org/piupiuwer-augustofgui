import { Request, Response } from "express";
import { container } from "tsyringe";

import DeletePiuService from "@modules/pius/services/DeletePiuService";
import CreatePiuService from "@modules/pius/services/CreatePiuService";
import EditPiuService from "@modules/pius/services/EditPiuService";

class PiusController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { content } = request.body;

    const createPiu = container.resolve(CreatePiuService);

    const piu = await createPiu.execute({
      author: id,
      content,
    });

    return response.json({ piu });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const deletePiu = container.resolve(DeletePiuService);

    const deletedPiu = await deletePiu.execute(id);

    return response.json(deletedPiu);
  }

  public async edit(request: Request, response: Response): Promise<Response> {
    const { piuId, content } = request.body;

    const editPiu = container.resolve(EditPiuService);

    const deletedPiu = await editPiu.execute({
      id: piuId,
      newContent: content,
    });

    return response.json(deletedPiu);
  }
}

export default PiusController;
