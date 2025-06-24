import { ClientSession, Document, Model } from 'mongoose';
import { ICrudRepository } from './interfaces/crud-repository.interface';

export default class BaseRepository<T extends Document> implements ICrudRepository<T> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async findAll(): Promise<T[]> {
    return this.model.find();
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findOne({ id });
  }

  async create(data: Partial<T>, session?: ClientSession): Promise<T> {
    const [doc] = await this.model.create([data], { session });
    return doc;
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return this.model.findOneAndUpdate({ id }, data, { new: true });
  }

  async delete(id: string): Promise<T | null> {
    return this.model.findOneAndDelete({ id });
  }
}
