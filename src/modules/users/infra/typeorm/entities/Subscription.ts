import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import User from './User';

@Entity('subscriptions')
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  owner_id: string;

  @Column()
  followed_id: string;

  @CreateDateColumn()
  created_at: Date;
}

export default Subscription;