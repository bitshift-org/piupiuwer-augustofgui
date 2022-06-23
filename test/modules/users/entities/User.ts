import { v4 as uuidv4 } from "uuid";

class User {
  id: string;

  username: string;

  email: string;

  password: string;

  follows: string[];

  constructor({ username, email, password }: Omit<User, "id" | "follows">) {
    this.id = uuidv4();
    this.username = username;
    this.email = email;
    this.password = password;
    this.follows = [];
  }
}

export default User;
