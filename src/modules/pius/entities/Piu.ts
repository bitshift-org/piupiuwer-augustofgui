import { v4 as uuidv4 } from "uuid";

class Piu {
  id: string;

  author: string;

  content: string;

  likedBy: string[];

  comments: string[];

  constructor({ author, content }: Omit<Piu, "id" | "likedBy" | "comments">) {
    this.id = uuidv4();
    this.author = author;
    this.content = content;
    this.likedBy = [];
    this.comments = [];
  }
}

export default Piu;