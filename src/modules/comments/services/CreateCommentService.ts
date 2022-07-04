import { injectable, inject } from "tsyringe";

import ICreateCommentDTO from "../dtos/ICreateCommentDTO";
import ICommentsRepository from "../repositories/ICommentsRepository";

@injectable()
class CreateCommentService {
  constructor(
    @inject("CommentsRepository")
    private readonly commentRepository: ICommentsRepository
  ) {}

  public async execute({ owner_id, author, content }: ICreateCommentDTO) {
    const comment = await this.commentRepository.create({
      owner_id,
      author,
      content,
    });

    return comment;
  }
}

export default CreateCommentService;
