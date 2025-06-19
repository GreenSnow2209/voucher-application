import { IVoucherDocument } from '../models/voucher.model';
import BaseService from './base.service';
import { VoucherRepository } from '../repositories/voucher.repository';
import { v4 as uuidv4 } from 'uuid';
import { EventRepository } from '../repositories/event.repository';
import { emailQueue } from '../queues/bullQueue';
import { logger } from '../utils/logger';

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

  async requestVoucher(eventId: string, userId: string): Promise<IVoucherDocument | null> {
    try {
      logger(eventId + ' - ' + userId);
      const event = await this.eventRepository.findById(eventId);
      if (!event) {
        this.logger(`Event ${eventId} not found`);
        return null;
      }

      const issuedCount = await this.voucherRepository.countByEventId(eventId);
      if (issuedCount >= event.quantity) {
        const error: any = new Error('Max quantity reached');
        error.statusCode = 456;
        this.logger(error, 'error');
        return null;
      }

      const id = uuidv4().toUpperCase();
      const code = uuidv4().toUpperCase();
      await emailQueue.add('sendEmail', {
        to: 'user@gmail.com',
        subject: 'Voucher Code Issue',
        text: `Here is voucher code: ${code}`,
      });

      return await this.voucherRepository.create({
        id,
        code,
        eventId,
        userId,
        issuedAt: new Date(),
      });
    } catch (err) {
      this.logger(err, 'error');
      return null;
    }
  }
}
