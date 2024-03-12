import { IsNumber, IsPositive, IsOptional } from 'class-validator';

import { IsString } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsString()
  readonly q?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly perPage?: number = 15;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly currentPage?: number = 1;
}
