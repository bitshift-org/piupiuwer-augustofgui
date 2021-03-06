import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('comments')
class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  owner_id: string;

  @Column()
  author: string;

  @Column()
  content: string;

  @CreateDateColumn()
  created_at: Date;
}

export default Comment;
