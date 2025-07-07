import { IEventDocument } from '../../../../models/event.model';
import { EventService } from '../../../../services/event.service';

const now = new Date();

const cases = [
  {
    description: 'should allow if editingExpiredAt is null',
    editingExpiredAt: null,
    expected: true,
  },
  {
    description: 'should allow if editingExpiredAt is in the future',
    editingExpiredAt: new Date(now.getTime() + 60_000),
    expected: true,
  },
  {
    description: 'should deny if editingExpiredAt is in the past',
    editingExpiredAt: new Date(now.getTime() - 60_000),
    expected: false,
  },
  {
    description: 'should deny if event not found',
    editingExpiredAt: null,
    expected: false,
    mockNull: true,
  },
];

const baseEvent = {
  id: 'event01',
} as IEventDocument;

describe('Event Service - Request Edit', () => {
  const service = new EventService();
  describe('requestEdit', () => {
    it.each(cases)('$description', async ({ editingExpiredAt, expected, mockNull }) => {
      if (mockNull) {
        jest.spyOn(service['eventRepository'], 'findById').mockResolvedValue(null);
      } else {
        const mockEvent = {
          ...baseEvent,
          editingExpiredAt,
        } as unknown as IEventDocument;
        jest.spyOn(service['eventRepository'], 'findById').mockResolvedValue(mockEvent);
      }
      const result = await service.requestEdit('event1', 'user1');
      expect(result).toEqual({ allowed: expected });
    });
  })
})
