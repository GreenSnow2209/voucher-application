import {Document} from "mongoose";
import BaseRepository from "./base.repository";
import {UserModel} from "../models/users.model";

interface IUser extends Document{
    id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
}

export class UserRepositpry extends BaseRepository<IUser> {
    constructor() {
        super(UserModel);
    }
}
