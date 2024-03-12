import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';

import { UserRole } from '../../common/enums/userRoles';
import { BasicEntity } from 'src/common/entities/basic.entity';
@Entity({ name: 'users' })
export class User extends BasicEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  lastname: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Exclude()
  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'boolean', default: true })
  enabled: boolean;
}
