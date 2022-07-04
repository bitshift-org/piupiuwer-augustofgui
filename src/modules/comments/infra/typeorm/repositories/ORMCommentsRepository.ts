import { v4 as uuidv4 } from "uuid";

import Comment from "../entities/Comment";
import ICommentsRepository from "@modules/comments/repositories/ICommentsRepository";
import ICreateCommentDTO from "@modules/comments/dtos/ICreateCommentDTO";
import PostgresDataSource from "@shared/infra/typeorm";
import { Repository } from "typeorm";

class ORMCommentsRepository implements ICommentsRepository {
  private commentsRepository: Repository<Comment>;
  constructor() {
    this.commentsRepository = PostgresDataSource.getRepository(Comment);
  }

  public async create({
    owner_id,
    author,
    content,
  }: ICreateCommentDTO): Promise<Comment> {
    const comment = this.commentsRepository.create({
      owner_id,
      author,
      content,
    });

    await this.commentsRepository.save(comment);

    return comment;
  }

  public async delete(comment: Comment): Promise<Comment> {
    const deletedComment = await this.commentsRepository.remove(comment);

    return deletedComment;
  }

  public async save(comment: Comment): Promise<Comment> {
    await this.commentsRepository.save(comment);

    return comment;
  }

  public async findById(id: string): Promise<Comment | null> {
    const foundComment = await this.commentsRepository.findOneBy({ id });

    return foundComment || null;
  }
}

export default ORMCommentsRepository;
