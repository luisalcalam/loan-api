import { setSeederFactory } from 'typeorm-extension';
import { UserRole } from '../../common/enums/userRoles';
import { User } from '../../users/entities/user.entity';

export default setSeederFactory(User, (faker) => {
  const user = new User();

  const sexFlag = faker.number.int(1);
  const sex: 'male' | 'female' = sexFlag ? 'male' : 'female';

  user.name = faker.person.firstName(sex);
  user.lastname = faker.person.lastName(sex);
  user.email = faker.internet.email({
    firstName: user.name,
    lastName: user.lastname,
  });
  user.password = faker.internet.password({
    length: 9,
    pattern: /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
  });
  user.role = UserRole.USER;

  return user;
});
