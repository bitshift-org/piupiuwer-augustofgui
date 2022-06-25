import { v4 as uuidv4 } from "uuid";

class Piu {
  id: string;

  username: string;

  email: string;

  password: string;

  likedBy: string[];

  comments: string[];

  constructor({ username, email, password }: Omit<Piu, "id" | "likedBy" | "comments">) {
    this.id = uuidv4();
    this.username = username;
    this.email = email;
    this.password = password;
    this.likedBy = [];
    this.comments = [];
  }
}

export default Piu;