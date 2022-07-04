import ICreateCommentDTO from "../dtos/ICreateCommentDTO";
import Comment from "../infra/typeorm/entities/Comment";

interface ICommentsRepository {
  create({ owner_id, author, content}: ICreateCommentDTO): Promise<Comment>;

  save(comment: Comment): Promise<Comment>;
}

export default ICommentsRepository;
