import { UserModel } from '../models/users'

export class UserService {
    async findAll() {
        return await UserModel.find();
    }

    async findOne(id: string) {
        return await UserModel.findById(id);
    }

    async create(data: any) {
        return await UserModel.create(data);
    }

    async update(id: string, data: any) {
        return await UserModel.findByIdAndUpdate(id, data, { new: true });
    }

    async remove(id: string) {
        return await UserModel.findByIdAndDelete(id);
    }
}