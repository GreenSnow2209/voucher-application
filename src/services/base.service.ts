import {ICrudRepository} from "../repositories/interfaces/crud-repository.interface";

export default class BaseService<T> {
    protected repository: ICrudRepository<T>;

    constructor(repository: ICrudRepository<T>) {
        this.repository = repository;
    }

    async findAll() {
        return this.repository.findAll();
    }

    async findOne(id: string) {
        return this.repository.findById(id);
    }

    async create(data: Partial<T>) {
        return this.repository.create(data);
    }

    async update(id: string, data: Partial<T>) {
        return this.repository.update(id, data);
    }

    async remove(id: string) {
        return this.repository.delete(id);
    }
}
