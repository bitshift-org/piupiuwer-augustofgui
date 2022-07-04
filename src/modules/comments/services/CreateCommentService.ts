import IPiusRepository from "@modules/pius/repositories/IPiuRepository";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import AppError from "@shared/errors/AppError";
import { injectable, inject } from "tsyringe";

import ICreateCommentDTO from "../dtos/ICreateCommentDTO";
import ICommentsRepository from "../repositories/ICommentsRepository";

@injectable()
class CreateCommentService {
  constructor(
    @inject("UsersRepository")
    private readonly usersRepository: IUsersRepository,
    @inject("PiusRepository")
    private readonly piusRepository: IPiusRepository,
    @inject("CommentsRepository")
    private readonly commentRepository: ICommentsRepository
  ) {}

  public async execute({ owner_id, author, content }: ICreateCommentDTO) {
    const piu = await this.piusRepository.findById(owner_id);

    if(!piu) {
      throw new AppError("An piu with this id was not found.", 404);
    }

    const user = await this.usersRepository.findById(author);

    if(!user) {
      throw new AppError("An user with this id was not found.", 404);
    }

    const comment = await this.commentRepository.create({
      owner_id,
      author,
      content,
    });

    return comment;
  }
}

export default CreateCommentService;
