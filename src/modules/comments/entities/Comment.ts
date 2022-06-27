import { v4 as uuidv4 } from 'uuid';
import ICreateCommentDTO from '../dtos/ICreateCommentDTO';

class Comment {
  id: string;

  author: string;

  content: string;

  likedBy: string[];

  constructor({ author, content }: Omit<Comment, "id" | "likedBy">) {
    this.id = uuidv4();
    this.author = author;
    this.content = content;
    this.likedBy = [];
  };
}

export default Comment;
