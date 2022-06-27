import ICreateCommentDTO from "../dtos/ICreateCommentDTO";
import Comment from "../entities/Comment";

interface ICommentsRepository {
  create({ author, content }: ICreateCommentDTO): Promise<Comment>;

  save(comment: Comment): Promise<Comment>;
}

export default ICommentsRepository;
