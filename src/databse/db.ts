import mongoose from 'mongoose';

export const connectDatabase = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGO_URI || '';
    const databaseName = process.env.DATABASE_NAME || 'voucher_app';
    await mongoose.connect(mongoUri + '/' + databaseName);
    console.log('Connected to mongodb successfully!');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
