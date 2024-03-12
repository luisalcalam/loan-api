import { Injectable } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { GenericService } from 'src/common/classes/Generic.service';
import { Loan } from './entities/loan.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LoansService extends GenericService<Loan, string> {
  constructor(@InjectRepository(Loan) private loanRepo: Repository<Loan>) {
    super(loanRepo, 'loan', 'Loan service');
  }
}
