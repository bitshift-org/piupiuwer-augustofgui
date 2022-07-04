import { Request, Response } from "express";
import { container } from "tsyringe";

import LikePiuService from "@modules/pius/services/LikePiuService";
import CreateCommentService from "@modules/comments/services/CreateCommentService";

class CommentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { piu_id, content } = request.body;
    const createComment = container.resolve(CreateCommentService);

    const responseLike = await createComment.execute({
      owner_id: piu_id,
      author: id,
      content
    });

    return response.json(responseLike);
  }
}

export default CommentsController;
