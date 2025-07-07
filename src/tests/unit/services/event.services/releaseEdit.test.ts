import { IEventDocument } from '../../../../models/event.model';
import { EventService } from '../../../../services/event.service';

const now = new Date();

const cases = [
  {
    description: 'should release if editingBy is correct and not expired',
    editingBy: 'user1',
    editingExpiredAt: new Date(now.getTime() + 60_000),
    callUser: 'user1',
    expectedNull: false,
  },
  {
    description: 'should not release if editingBy is different user',
    editingBy: 'user2',
    editingExpiredAt: new Date(now.getTime() + 60_000),
    callUser: 'user1',
    expectedNull: true,
  },
  {
    description: 'should not release if edit session expired',
    editingBy: 'user1',
    editingExpiredAt: new Date(now.getTime() - 60_000),
    callUser: 'user1',
    expectedNull: true,
  },
  {
    description: 'should deny if event not found',
    editingExpiredAt: null,
    expectedNull: false,
    callUser: 'user1',
    mockNull: true,
  },
];

const baseEvent = {
  id: 'event01',
} as IEventDocument;

describe('Event Service - Release Edit', () => {
  const service = new EventService();
  describe('releaseEdit', () => {
    it.each(cases)('$description', async ({ editingBy, editingExpiredAt, callUser, expectedNull, mockNull }) => {
      if (mockNull) {
        jest.spyOn(service['eventRepository'], 'findById').mockResolvedValue(null);
      } else {
        const mockEvent = {
          ...baseEvent,
          editingBy,
          editingExpiredAt,
        } as unknown as IEventDocument;
        jest.spyOn(service['eventRepository'], 'findById').mockResolvedValue(mockEvent);
        jest.spyOn(service, 'update').mockResolvedValue({
          ...mockEvent,
          editingBy: '',
          editingExpiredAt: null,
        } as IEventDocument);
      }

      const result = await service.releaseEdit('event1', callUser);
      if (expectedNull) {
        expect(result).toBeNull();
      } else {
        expect(typeof result).toBe('object');
      }
    });
  })
})
