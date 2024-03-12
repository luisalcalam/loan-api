import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { LoanStatus } from '../enums/loanStatus.enum';
import { BasicEntity } from 'src/common/entities/basic.entity';

@Entity({ name: 'aplications' })
export class Loan extends BasicEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'decimal' })
  amount: number;

  @Column({ name: 'interest_rate', type: 'decimal' })
  interestRate: number;

  @Column()
  term: number;

  @Column({ name: 'start_date', type: 'date' })
  startDate: Date;

  @Column({
    name: 'end_date',
    type: 'date',
    nullable: true,
  })
  endDate: Date;

  @Column({
    type: 'enum',
    enum: LoanStatus,
    default: LoanStatus.ACTIVE,
  })
  status: LoanStatus;

  @BeforeInsert()
  calculateEndDate() {
    if (this.startDate && this.term) {
      const endDate = new Date(this.startDate);
      endDate.setMonth(endDate.getMonth() + this.term);
      this.endDate = endDate;
    }
  }
}
