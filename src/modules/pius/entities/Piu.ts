import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('pius')
class Piu {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  author_id: string;

  @Column()
  content: string;

  @Column()
  liked_by: string[];

  // @Column()
  // comments: string[];
}

export default Piu;