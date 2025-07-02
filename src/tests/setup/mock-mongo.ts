import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { appConfig } from '../../config/app.config';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = appConfig.mongoURI || '';
  const databaseName = appConfig.databaseName || 'voucher_app';
  await mongoose.connect(mongoUri + '/' + databaseName);
  //const uri = mongoServer.getUri();
  //console.log('Mongo URI:', uri);
  await mongoose.connect(mongoUri + '/' + databaseName);
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
