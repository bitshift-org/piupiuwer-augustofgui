import ICreateCommentDTO from "../dtos/ICreateCommentDTO";
import Comment from "../entities/Comment";
import ICommentsRepository from "./ICommentsRepository";

class MockCommentsRepository implements ICommentsRepository {
  private comments: Comment[] = [];

  public async create({
    author,
    content,
  }: ICreateCommentDTO): Promise<Comment> {
    const comment = new Comment({ author, content });

    this.comments.push(comment);

    return comment;
  }

  public async save(comment: Comment): Promise<Comment> {
    const commentIndex = this.comments.findIndex(item => item.id == comment.id);
    this.comments[commentIndex] = comment;

    return comment;
  }
}

export default MockCommentsRepository;
