import { ICrudRepository } from '../repositories/interfaces/crud-repository.interface';
import { v4 as uuidv4 } from 'uuid';
import { logger, LoggerFunction } from '../utils/logger';

export default class BaseService<T> {
  protected repository: ICrudRepository<T>;
  protected logger: LoggerFunction;

  constructor(repository: ICrudRepository<T>) {
    this.repository = repository;
    this.logger = logger;
  }

  async findAll(): Promise<T[]> {
    return await this.repository.findAll();
  }

  async findOne(id: string): Promise<T | null> {
    return await this.repository.findById(id);
  }

  async create(data: Partial<T>): Promise<T> {
    const dataCreate = { id: uuidv4().toUpperCase(), ...data };
    return await this.repository.create(dataCreate);
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return await this.repository.update(id, data);
  }

  async remove(id: string): Promise<T | null> {
    return await this.repository.delete(id);
  }
}
