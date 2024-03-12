import { Injectable } from '@nestjs/common';
import { Session } from './entities/session.entity';
import { GenericService } from '../common/classes/Generic.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SessionsService extends GenericService<Session, string> {
  constructor(
    @InjectRepository(Session) private sessionRepo: Repository<Session>,
  ) {
    super(sessionRepo, 'session', 'Sessions service');
  }
}
