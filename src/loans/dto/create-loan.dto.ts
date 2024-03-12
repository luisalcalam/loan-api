import {
  IsNumber,
  IsDateString,
  IsEnum,
  IsOptional,
  isDate,
  IsDate,
} from 'class-validator';
import { LoanStatus } from '../enums/loanStatus.enum';

export class CreateLoanDto {
  @IsNumber()
  amount: number;

  @IsNumber()
  interestRate: number;

  @IsNumber()
  term: number;

  @IsDate()
  startDate: Date = new Date();

  @IsOptional()
  @IsEnum(LoanStatus)
  status: LoanStatus;
}
