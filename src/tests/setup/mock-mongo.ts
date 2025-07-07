import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { testConfig } from '../../config/test.config';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(testConfig.mongoURI + '/' + testConfig.databaseName);
}, 30_000);

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});
