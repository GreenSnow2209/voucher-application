import { VoucherService } from '../../../../services/voucher.service';
import { IEventDocument } from '../../../../models/event.model';
import { IVoucherDocument } from '../../../../models/voucher.model';

describe('VoucherService', () => {
  let service: VoucherService;

  beforeAll(() => {
    service = new VoucherService();
  });

  const baseEvent: IEventDocument = {
    id: 'event01',
    title: 'Test Event',
    description: 'Some desc',
    quantity: 10,
    status: true,
    start: new Date(),
    end: new Date(Date.now() + 1000 * 60 * 60),
    editingBy: '',
    editingExpiredAt: null,
  } as IEventDocument;

  const basePayload = {
    title: 'Test',
    description: 'Test',
    startDate: new Date(),
    expireDate: new Date(Date.now() + 1000 * 60),
    value: 100,
    isPercentage: true,
  };

  const cases = [
    {
      description: 'should issue all requested vouchers within limit',
      eventQuantity: 10,
      existingVouchers: 5,
      requestQuantity: 4,
      expectedCount: 4,
    },
    {
      description: 'should issue only up to available quantity',
      eventQuantity: 10,
      existingVouchers: 7,
      requestQuantity: 5,
      expectedCount: 3,
    },
    {
      description: 'should return null if event not found',
      mockNullEvent: true,
      requestQuantity: 3,
      expectedCount: null,
    },
    {
      description: 'should return null if existing vouchers already at max',
      eventQuantity: 5,
      existingVouchers: 5,
      requestQuantity: 1,
      expectedCount: null,
    },
    {
      description: 'should default to 1 voucher if quantity not specified',
      eventQuantity: 10,
      existingVouchers: 0,
      requestQuantity: undefined,
      expectedCount: 1,
    },
  ];

  it.each(cases)(
    '$description',
    async ({
             eventQuantity,
             existingVouchers,
             requestQuantity,
             expectedCount,
             mockNullEvent,
           }) => {
      const event = {
        ...baseEvent,
        quantity: eventQuantity ?? baseEvent.quantity,
      } as IEventDocument;

      if (mockNullEvent) {
        jest.spyOn(service['eventRepository'], 'findById').mockResolvedValue(null);
      } else {
        jest.spyOn(service['eventRepository'], 'findById').mockResolvedValue(event);
      }

      jest.spyOn(service['voucherRepository'], 'countByEventId').mockResolvedValue(existingVouchers ?? 0);

      /*const mockInsert = jest
        .spyOn(service['voucherRepository'], 'insertMany')
        .mockImplementation(async (docs: Partial<IVoucherDocument>[]) => {
          return docs.map((doc) => ({
            ...doc,
            id: doc.id!,
            code: doc.code!,
            createdAt: new Date(),
          })) as IVoucherDocument[];
        });*/

      const result = await service.requestVoucher(event.id, 'U002', {
        ...basePayload,
        quantity: requestQuantity,
      });

      if (expectedCount === null) {
        expect(result).toBeNull();
        //expect(mockInsert).not.toHaveBeenCalled();
      } else {
        expect(Array.isArray(result)).toBe(true);
        expect(result?.length).toBe(expectedCount);
        //expect(mockInsert).toHaveBeenCalledTimes(1);
      }
    },
    30_000
  );
});
