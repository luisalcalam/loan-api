import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { UserRole } from 'src/common/enums/userRoles';

@Controller('aplications')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Post()
  @Auth()
  create(@Body() createLoanDto: CreateLoanDto) {
    return this.loansService.create(createLoanDto);
  }

  @Get()
  @Auth(UserRole.ADMIN)
  findAll(@Query() params: PaginationDto) {
    return this.loansService.findAll(params);
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.loansService.findOne(id);
  }

  @Patch(':id')
  @Auth()
  update(@Param('id') id: string, @Body() updateLoanDto: UpdateLoanDto) {
    return this.loansService.update(id, updateLoanDto);
  }

  @Delete(':id')
  @Auth(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.loansService.remove(id);
  }
}
