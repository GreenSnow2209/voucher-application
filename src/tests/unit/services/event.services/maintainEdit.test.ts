import { IEventDocument } from '../../../../models/event.model';
import { EventService } from '../../../../services/event.service';

const now = new Date();

const cases = [
  {
    description: 'should maintain if editingBy is correct and not expired',
    editingBy: 'user1',
    editingExpiredAt: new Date(now.getTime() + 60_000),
    callUser: 'user1',
    expected: true,
  },
  {
    description: 'should not maintain if editingBy is different user',
    editingBy: 'user2',
    editingExpiredAt: new Date(now.getTime() + 60_000),
    callUser: 'user1',
    expected: false,
  },
  {
    description: 'should not maintain if edit session expired',
    editingBy: 'user1',
    editingExpiredAt: new Date(now.getTime() - 60_000),
    callUser: 'user1',
    expected: false,
  },
  {
    description: 'should not maintain if event not found',
    editingExpiredAt: null,
    callUser: 'user1',
    expected: false,
    mockNull: true,
  },
];

const baseEvent = {
  id: 'event01',
} as IEventDocument;

describe('Event Service - Maintain Edit', () => {
  const service = new EventService();

  describe('maintainEdit', () => {
    it.each(cases)(
      '$description',
      async ({ editingBy, editingExpiredAt, callUser, expected, mockNull }) => {
        if (mockNull) {
          jest.spyOn(service['eventRepository'], 'findById').mockResolvedValue(null);
        } else {
          const mockEvent = {
            ...baseEvent,
            editingBy,
            editingExpiredAt,
          } as unknown as IEventDocument;
          jest.spyOn(service['eventRepository'], 'findById').mockResolvedValue(mockEvent);
          //jest.spyOn(service['eventRepository'], 'update').mockResolvedValue();
        }

        const result = await service.maintainEdit('event1', callUser);
        expect(result).toBe(expected);
      }
    );
  });
});
