import ICreateCommentDTO from "../dtos/ICreateCommentDTO";
import Comment from "../infra/typeorm/entities/Comment";

interface ICommentsRepository {
  create({ owner_id, author, content}: ICreateCommentDTO): Promise<Comment>;

  delete(comment: Comment): Promise<Comment>;

  save(comment: Comment): Promise<Comment>;

  findById(id: string): Promise<Comment | null>;

}

export default ICommentsRepository;
