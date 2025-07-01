import { VoucherService } from '../../services/voucher.service';
import { IEventDocument } from '../../models/event.model';

describe('VoucherService', () => {
  let service: VoucherService;

  beforeAll(() => {
    service = new VoucherService();
  });

  it('should only issue up to event.quantity - existing vouchers', async () => {
    const eventId = 'C283086B-AD02-4C83-8BCC-68C1E59FE93A';

    const mockEvent = {
      id: eventId,
      title: 'Limited Event',
      description: 'Limited Voucher',
      quantity: 10,
      status: true,
      start: new Date(),
      end: new Date(Date.now() + 1000 * 60 * 60),
      editingBy: '',
      editingExpiredAt: null,
    } as IEventDocument;

    jest.spyOn(service['eventRepository'], 'findById').mockResolvedValue(mockEvent);
    jest.spyOn(service['voucherRepository'], 'countByEventId').mockResolvedValue(5);

    const result = await service.requestVoucher(eventId, 'U002', {
      title: 'Test',
      description: 'Test',
      startDate: new Date(),
      expireDate: new Date(Date.now() + 1000 * 60),
      value: 100,
      isPercentage: true,
      quantity: 7,
    });
    console.log(result);
    expect(result?.length).toBe(5);
  }, 30_000);
});
