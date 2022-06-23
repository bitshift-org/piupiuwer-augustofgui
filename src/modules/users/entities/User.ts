import { v4 as uuidv4 } from 'uuid';

class User {
    id: string;

    username: string;

    email: string;

    password: string;

    constructor({ username, email, password }: Omit<User, "id">) {
        this.id = uuidv4();
        this.username = username;
        this.email = email;
        this.password = password;
    }
}

export default User;