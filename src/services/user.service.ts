import { IUserDocument } from '../models/user.model';
import BaseService from './base.service';
import { UserRepository } from '../repositories/user.repository';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export class UserService extends BaseService<IUserDocument> {
  protected static instance: UserService;
  protected userRepository: UserRepository;

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  constructor() {
    const userRepo = new UserRepository();
    super(userRepo);
    this.userRepository = userRepo;
  }

  async validateLogin(email: string, password: string): Promise<IUserDocument | null> {
    if (!email || !password) {
      return null;
    }
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return null;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return null;
    }
    return user;
  }

  async register(email: string, password: string, name: string): Promise<IUserDocument | null> {
    if (!email || !password || !name) {
      return null;
    }
    const userExists = await this.userRepository.findByEmail(email);
    if (userExists) {
      return null;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {
      id: uuidv4().toUpperCase(),
      email,
      password: hashedPassword,
      name,
    };
    return await this.create(userData);
  }
}
