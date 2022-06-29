import { v4 as uuidv4 } from "uuid";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  follows: string[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  constructor({ username, email, password }: Omit<User, "id" | "follows" | "created_at" | "updated_at" | "deleted_at">) {
    this.id = uuidv4();
    this.username = username;
    this.email = email;
    this.password = password;
    this.follows = [];
    this.created_at = new Date();
    this.updated_at = new Date();
    this.deleted_at = new Date();
  }
}

export default User;
