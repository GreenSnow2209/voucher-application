import { Model, Document } from 'mongoose';
import { ICrudRepository } from './interfaces/crud-repository.interface';
import { logger } from '../utils/logger';

export default class BaseRepository<T extends Document> implements ICrudRepository<T> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async findAll(): Promise<T[]> {
    return await this.model.find();
  }

  async findById(id: string): Promise<T | null> {
    const model = await this.model.findOne({ id });
    logger(JSON.stringify(model), 'warn');
    return model;
  }

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return this.model.findOneAndUpdate({ id }, data);
  }

  async delete(id: string): Promise<T | null> {
    return this.model.findOneAndDelete({ id });
  }
}
