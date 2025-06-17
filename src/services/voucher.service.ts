import { IVoucherDocument } from '../models/voucher.model';
import BaseService from './base.service';
import { VoucherRepository } from '../repositories/voucher.repository';
import { v4 as uuidv4 } from 'uuid';
import { EventRepository } from '../repositories/event.repository';

export class VoucherService extends BaseService<IVoucherDocument> {
  private voucherRepository: VoucherRepository;
  private eventRepository: EventRepository;

  constructor() {
    const voucherRepo = new VoucherRepository();
    super(voucherRepo);
    this.voucherRepository = voucherRepo;
    this.eventRepository = new EventRepository();
  }

  async requestVoucher(eventId: string, userId: string): Promise<IVoucherDocument | null> {
    try {
      const event = await this.eventRepository.findById(eventId);
      if (!event) throw new Error('Event not found');

      const issuedCount = await this.voucherRepository.countByEventId(eventId);
      if (issuedCount >= event.maxQuantity) {
        const error: any = new Error('Max quantity reached');
        error.statusCode = 456;
        throw error;
      }

      const id = uuidv4().toUpperCase();
      const code = uuidv4().toUpperCase();
      const voucher = await this.voucherRepository.create({
        id,
        code,
        eventId,
        userId,
        issuedAt: new Date(),
      });
      console.log('voucher', voucher);

      /*await emailQueue.add('sendEmail', {
                to: 'user@gmail.com',
                subject: 'Voucher Code Issue',
                text: `Here is voucher code: ${code}`,
            });*/

      return voucher;
    } catch (err) {
      throw err;
    }
  }
}
