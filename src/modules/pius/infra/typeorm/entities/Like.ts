import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('likes')
class Like {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  piu_id: string;

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: Date;
}

export default Like;