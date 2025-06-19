import Queue from 'bull';
import { redisConfig } from '../config/redis';

export const emailQueue = new Queue('email', redisConfig);
