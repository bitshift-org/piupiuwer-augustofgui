import { Request, Response } from "express";
import { container } from "tsyringe";

import LikePiuService from "@modules/pius/services/LikePiuService";
import CreateCommentService from "@modules/comments/services/CreateCommentService";
import DeleteCommentService from "@modules/comments/services/DeleteCommentService";

class CommentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { piu_id, content } = request.body;
    const createComment = container.resolve(CreateCommentService);

    const comment = await createComment.execute({
      owner_id: piu_id,
      author: id,
      content
    });

    return response.json(comment);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { comment_id } = request.body;
    const deleteComment = container.resolve(DeleteCommentService);

    const deletedComment = await deleteComment.execute(comment_id);

    return response.json(deletedComment);
  }
}

export default CommentsController;
