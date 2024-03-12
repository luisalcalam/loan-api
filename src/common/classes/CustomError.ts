import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

export class HandleErrors {
  static handleDBExceptions(error: any, logger: Logger) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }

  static throwRegisterNotFound(label: string) {
    throw new NotFoundException(`${label} not found`);
  }
}
