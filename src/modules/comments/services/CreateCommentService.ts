import ICreateCommentDTO from "../dtos/ICreateCommentDTO";
import ICommentsRepository from "../repositories/ICommentsRepository";

class CreateCommentService {
  constructor( private readonly commentRepository: ICommentsRepository){}

  public async execute({ author, content }: ICreateCommentDTO){
    const comment = await this.commentRepository.create({
      author,
      content
    });

    return comment;
  }
}

export default CreateCommentService;