import AppError from "@shared/errors/AppError";
import { injectable, inject } from "tsyringe";

import ICreateCommentDTO from "../dtos/ICreateCommentDTO";
import ICommentsRepository from "../repositories/ICommentsRepository";

@injectable()
class DeleteCommentService {
  constructor(
    @inject("CommentsRepository")
    private readonly commentRepository: ICommentsRepository
  ) {}

  public async execute(comment_id: string) {
    const foundComment = await this.commentRepository.findById(comment_id);

    if(!foundComment) {
      throw new AppError("An comment with this id was not found");
    }
    
    const comment = await this.commentRepository.delete(foundComment);

    return comment;
  }
}

export default DeleteCommentService;
