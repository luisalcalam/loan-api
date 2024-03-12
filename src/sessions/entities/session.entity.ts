import { Exclude } from 'class-transformer';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';

@Entity({ name: 'sessions' })
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Exclude()
  @Column({ type: 'text', name: 'refresh_token' })
  refreshToken: string;

  @Column({
    type: 'timestamptz',
    name: 'expires_in',
  })
  expiresIn: Date;

  @ManyToOne(() => User, (user) => user.session, { eager: true })
  user: User;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'timestamptz',
    name: 'last_session',
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastSession: Date;
}
