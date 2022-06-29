import { v4 as uuidv4 } from "uuid";
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

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

  @ManyToMany(() => User)
  @JoinTable() 
  follows: User[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  constructor({ username, email, password }: Pick<User, "username" | "email" | "password"> = {} as Pick<User, "username" | "email" | "password">) {
    this.id = uuidv4();
    this.username = username;
    this.email = email;
    this.password = password;
    this.created_at = new Date();
    this.updated_at = new Date();
    this.deleted_at = new Date();
  }
}

export default User;
