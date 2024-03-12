import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from 'src/users/entities/user.entity';
import { UserRole } from 'src/common/enums/userRoles';
import { Loan } from '../../loans/entities/loan.entity';
import { LoanStatus } from '../../loans/enums/loanStatus.enum';

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    await dataSource.query('TRUNCATE "aplications" RESTART IDENTITY;');
    await dataSource.query('TRUNCATE "users" CASCADE');

    const repository = dataSource.getRepository(User);
    const aplicationsRepository = dataSource.getRepository(Loan);
    const userId = uuid();
    await repository.insert([
      {
        name: 'Luis',
        lastname: 'Alcala',
        email: 'admin@gmail.com',
        password: '123456All',
        role: UserRole.ADMIN,
      },
      {
        id: userId,
        name: 'Luis',
        lastname: 'guest',
        email: 'guest@gmail.com',
        password: '123456All',
        role: UserRole.USER,
      },
    ]);
    await aplicationsRepository.insert([
      {
        amount: 1000,
        term: 12,
        interestRate: 0.1,
        startDate: new Date(),
        status: LoanStatus.ACTIVE,
      },
    ]);
  }
}
