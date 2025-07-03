import dotenv from 'dotenv';

dotenv.config();

export const agendaConfig = {
  address: process.env.MONGO_URI || 'mongodb://localhost:27017',
  collection: process.env.DATABASE_NAME || 'voucher_app',
};
