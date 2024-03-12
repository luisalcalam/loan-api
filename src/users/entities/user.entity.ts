import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';

import { UserRole } from '../../common/enums/userRoles';
import { BasicEntity } from 'src/common/entities/basic.entity';
import { Session } from 'src/sessions/entities/session.entity';
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

  @OneToMany(() => Session, (session) => session.user)
  session: Session;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPasswordAndValidateEmail() {
    if (this.email) {
      this.email = this.email.toLowerCase().trim();
    }
    if (!this.password) {
      return;
    }
    this.password = await bcrypt.hashSync(this.password, 10);
  }
}
