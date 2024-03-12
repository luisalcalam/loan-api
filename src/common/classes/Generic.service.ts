import { InternalServerErrorException, Logger } from '@nestjs/common';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { HandleErrors } from './CustomError';
import { User } from '../../users/entities/user.entity';

export abstract class GenericService<
  ENTITY extends Record<string, any>,
  ID extends string | number,
> {
  private readonly genericRepository: Repository<ENTITY>;
  private label: string;
  logger: Logger;
  constructor(
    genericRepository: Repository<ENTITY>,
    label = 'register',
    service = 'Generic service',
  ) {
    this.genericRepository = genericRepository;
    this.label = label;
    this.logger = new Logger(service);
  }

  async findAll(): Promise<ENTITY[]> {
    try {
      const data = await this.genericRepository.find();
      return data;
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
