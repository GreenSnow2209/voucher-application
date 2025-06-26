import { Queue } from 'bullmq';
import { getRedisClient } from '../utils/redis';

export const emailQueue = new Queue('email', { connection: getRedisClient() });
