import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class SignupDto extends PartialType(
  OmitType(CreateUserDto, ['role'] as const),
) {}
