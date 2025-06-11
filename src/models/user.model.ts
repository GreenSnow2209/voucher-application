import mongoose, {Model, Document} from "mongoose";
import {IUser} from "./interfaces/user.interface";

export type IUserDocument = IUser & Document;

const UserSchema = new mongoose.Schema({
    id: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    phone: {type: String, required: true}
}, {timestamps: true});
export const UserModel: Model<IUserDocument> = mongoose.model<IUserDocument>("User", UserSchema);