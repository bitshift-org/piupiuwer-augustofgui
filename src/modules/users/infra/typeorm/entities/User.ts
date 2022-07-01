import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Subscription } from './Subscription';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  // @OneToMany(type => Subscription, subscriptions => subscriptions.owner)
  // following: Subscription[];

  // @OneToMany(type => Subscription, subscriptions => subscriptions.followed)
  // followers: Subscription[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
