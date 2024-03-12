import { InternalServerErrorException, Logger } from '@nestjs/common';
import { DeepPartial, FindOptionsWhere, ILike, Repository } from 'typeorm';
import { HandleErrors } from './CustomError';
import { User } from '../../users/entities/user.entity';
import { FindAllResponse } from '../interfaces/find.interface';
import { Pagination } from '../interfaces/pagination';
import { PaginationDto } from '../dtos/pagination.dto';

export abstract class GenericService<
  ENTITY extends Record<string, any>,
  ID extends string | number,
> {
  private readonly genericRepository: Repository<ENTITY>;
  private label: string;
  private readonly textFields: string[];
  logger: Logger;
  constructor(
    genericRepository: Repository<ENTITY>,
    label = 'register',
    service = 'Generic service',
    textFields: string[] = [],
  ) {
    this.genericRepository = genericRepository;
    this.label = label;
    this.logger = new Logger(service);
    this.textFields = textFields;
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<FindAllResponse<ENTITY[]>> {
    try {
      const skip = (paginationDto.currentPage - 1) * paginationDto.perPage;
      const { perPage, currentPage } = paginationDto;
      let where = {};
      if (paginationDto.q && this.textFields.length > 0) {
        where = this.textFields.map((field) => ({
          [field]: ILike(`%${paginationDto.q}%`),
        }));
      }
      const data = await this.genericRepository.findAndCount({
        where,
        skip,
        take: perPage,
      });
      const totalPages = Math.ceil(data[1] / perPage);
      const pagination: Pagination = {
        perPage,
        currentPage,
        totalPages,
        totalRows: data[1],
      };
      return {
        content: data[0],
        pagination,
      };
    } catch (error) {
      HandleErrors.handleDBExceptions(error, this.logger);
    }
  }

  async findOne(id: ID): Promise<ENTITY> {
    try {
      const options: FindOptionsWhere<ENTITY> = {
        where: { id },
      } as unknown as FindOptionsWhere<ENTITY>;
      const item = await this.genericRepository.findOne(options);
      if (!item) {
        HandleErrors.throwRegisterNotFound(this.label);
      }
      return item;
    } catch (error) {
      HandleErrors.handleDBExceptions(error, this.logger);
    }
  }

  async findOneWhere(where: Record<string, any>) {
    try {
      const options: FindOptionsWhere<ENTITY> = {
        where,
      } as unknown as FindOptionsWhere<ENTITY>;
      const item = await this.genericRepository.findOne(options);
      if (!item) {
        HandleErrors.throwRegisterNotFound(this.label);
      }
      return item;
    } catch (error) {
      HandleErrors.handleDBExceptions(error, this.logger);
    }
  }

  async create(data: DeepPartial<ENTITY>, user?: User): Promise<ENTITY> {
    try {
      const newItem = this.genericRepository.create({ ...data, user });
      await this.genericRepository.save(newItem);
      return newItem;
    } catch (error) {
      HandleErrors.handleDBExceptions(error, this.logger);
    }
  }

  async update(id: ID, data: DeepPartial<ENTITY>): Promise<ENTITY> {
    try {
      const item = await this.findOne(id);
      this.genericRepository.merge(item, data);
      return this.genericRepository.save(item);
    } catch (error) {
      HandleErrors.handleDBExceptions(error, this.logger);
    }
  }

  async remove(id: ID): Promise<boolean> {
    try {
      await this.genericRepository.delete(id);
      return true;
    } catch (error) {
      HandleErrors.handleDBExceptions(error, this.logger);
    }
  }

  async softDelete(id: ID): Promise<boolean> {
    try {
      const deleteResponse = await this.genericRepository.softDelete(id);
      if (!deleteResponse.affected) {
        HandleErrors.throwRegisterNotFound(this.label);
      }
      return true;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
