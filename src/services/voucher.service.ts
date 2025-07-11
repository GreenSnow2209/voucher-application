import { IVoucherDocument } from '../models/voucher.model';
import BaseService from './base.service';
import { VoucherRepository } from '../repositories/voucher.repository';
import { v4 as uuidv4 } from 'uuid';
import { EventRepository } from '../repositories/event.repository';
import { emailQueue } from '../queues/bullQueue';
import { logger } from '../utils/logger';
import mongoose from 'mongoose';
import { IEventDocument } from '../models/event.model';

export class VoucherService extends BaseService<IVoucherDocument> {
  protected static instance: VoucherService;
  private voucherRepository: VoucherRepository;
  private eventRepository: EventRepository;

  public static getInstance(): VoucherService {
    if (!VoucherService.instance) {
      VoucherService.instance = new VoucherService();
    }
    return VoucherService.instance;
  }

  constructor() {
    const voucherRepo = new VoucherRepository();
    super(voucherRepo);
    this.voucherRepository = voucherRepo;
    this.eventRepository = new EventRepository();
  }

  async requestVoucher(
    eventId: string,
    userId: string,
    payload: {
      title: string;
      description?: string;
      startDate: Date;
      expireDate?: Date;
      value: number;
      isPercentage?: boolean;
      quantity?: number;
    }
  ): Promise<IVoucherDocument[] | null> {
    const session = await mongoose.startSession();
    try {
      let insertedVouchers: IVoucherDocument[] = [];
      let event: IEventDocument | null = null;

      await session.withTransaction(async () => {
        event = await this.eventRepository.findById(eventId);
        if (!event) {
          this.logger(`Event ${eventId} not found`);
          return null;
        }

        const existCount = await this.voucherRepository.countByEventId(eventId);
        if (existCount >= event.quantity) {
          const error: any = new Error('Max quantity reahed');
          error.statusCode = 456;
          this.logger(error, 'error');
          return null;
        }

        const now = new Date();
        let currentCount = existCount;
        const listVoucher: Partial<IVoucherDocument>[] = [];

        for (let i = 0; i < (payload.quantity ?? 1); i++) {
          if (currentCount >= event.quantity) break;

          listVoucher.push({
            id: uuidv4().toUpperCase(),
            code: uuidv4().toUpperCase(),
            eventId,
            userId,
            issuedAt: now,
            title: payload.title,
            description: payload.description || '',
            startDate: payload.startDate,
            expireDate: payload.expireDate,
            value: payload.value,
            isPercentage: payload.isPercentage ?? false,
          });

          currentCount++;
        }

        insertedVouchers = await this.voucherRepository.insertMany(listVoucher, session);
      }, {
        readPreference: 'primary',
        readConcern: { level: 'local' },
        writeConcern: { w: 'majority' }
      });

      if (!insertedVouchers || !insertedVouchers.length || !event) {
        this.logger('Voucher not created', 'error');
        return null;
      }
      return insertedVouchers;
    } catch (err) {
      this.logger(err, 'error');
      return null;
    } finally {
      await session.endSession();
    }
  }
}
