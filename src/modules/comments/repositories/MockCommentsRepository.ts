import { v4 as uuidv4 } from 'uuid';

import ICreateCommentDTO from "../dtos/ICreateCommentDTO";
import Comment from "../infra/typeorm/entities/Comment";
import ICommentsRepository from "./ICommentsRepository";

class MockCommentsRepository implements ICommentsRepository {
  private comments: Comment[] = [];

  public async create({
    owner_id,
    author,
    content,
  }: ICreateCommentDTO): Promise<Comment> {
    const comment = new Comment();

    comment.id = uuidv4();
    comment.owner_id = owner_id;
    comment.author = author;
    comment.content = content;
    comment.created_at = new Date();

    this.comments.push(comment);

    return comment;
  }

  public async delete(comment: Comment): Promise<Comment> {
    this.comments.forEach((item, index) => {
      if (item === comment) {
        this.comments.splice(index, 1);
        return item;
      }
    });

    return comment;
  }

  public async save(comment: Comment): Promise<Comment> {
    const commentIndex = this.comments.findIndex(item => item.id == comment.id);
    this.comments[commentIndex] = comment;

    return comment;
  }

  public async findById(id: string): Promise<Comment | null> {
    const foundComment = this.comments.find((comment) => id === comment.id);

    return foundComment || null;
  }
}

export default MockCommentsRepository;
