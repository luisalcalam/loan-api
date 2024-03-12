import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { GenericService } from 'src/common/classes/Generic.service';

@Injectable()
export class UsersService extends GenericService<User, string> {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {
    super(userRepo, 'user');
  }
}
