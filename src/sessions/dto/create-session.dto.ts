import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsMongoId,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class CreateSessionDto {
  @IsUUID()
  @IsOptional()
  readonly id?: string;

  @IsString()
  @IsNotEmpty()
  readonly refreshToken: string;

  @IsDate()
  @IsNotEmpty()
  readonly expiresIn: Date;

  @IsDate()
  readonly last_session?: Date;
}
