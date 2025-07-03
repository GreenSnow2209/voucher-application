import { EventService } from '../../services/event.service';
import { IEventDocument } from '../../models/event.model';

describe('EventService - Main Cases', () => {
  let service: EventService;

  beforeAll(() => {
    service = new EventService();
  });

  describe('requestEdit', () => {
    it('should allow user to edit if not being edited', async () => {
      const mockEvent = {
        id: 'event1',
        editingBy: '',
        editingExpiredAt: null,
      } as unknown as IEventDocument;

      jest.spyOn(service['eventRepository'], 'findById').mockResolvedValue(mockEvent);
      jest.spyOn(service['eventRepository'], 'update').mockResolvedValue(mockEvent);

      const result = await service.requestEdit('event1', 'user1');
      expect(result).toEqual({ allowed: true });
    });

    it('should deny if someone else is editing', async () => {
      const mockEvent = {
        id: 'event1',
        editingBy: 'otherUser',
        editingExpiredAt: new Date(Date.now() + 60_000),
      } as IEventDocument;
      jest.spyOn(service['eventRepository'], 'findById').mockResolvedValue(mockEvent);

      const result = await service.requestEdit('event1', 'user1');
      expect(result).toEqual({ allowed: false });
    });
  });

  describe('releaseEdit', () => {
    it('should release edit if user is the editor and still valid', async () => {
      const mockEvent = {
        id: 'event1',
        editingBy: 'user1',
        editingExpiredAt: new Date(Date.now() + 60_000),
      } as IEventDocument;

      jest.spyOn(service['eventRepository'], 'findById').mockResolvedValue(mockEvent);
      jest.spyOn(service, 'update').mockResolvedValue({
        ...mockEvent,
        editingBy: '',
        editingExpiredAt: null,
      } as IEventDocument);

      const result = await service.releaseEdit('event1', 'user1');
      expect(result?.editingBy).toBe('');
      expect(result?.editingExpiredAt).toBeNull();
    });
  });

  describe('maintainEdit', () => {
    const now = new Date();
    const baseEvent = {
      id: 'event1',
      editingBy: 'user1',
      editingExpiredAt: new Date(now.getTime() + 60_000),
    };

    const cases = [
      {
        description: 'should extend editing expiration if still valid',
        editingBy: 'user1',
        callUser: 'user1',
        expected: true,
      },
      {
        description: "shouldn't extend editing expiration if invalid user",
        editingBy: 'user1',
        callUser: 'user2',
        expected: false,
      },
    ];

    it.each(cases)('$description', async ({ editingBy, callUser, expected }) => {
      const mockEvent = {
        ...baseEvent,
        editingBy,
      } as unknown as IEventDocument;

      jest.spyOn(service['eventRepository'], 'findById').mockResolvedValue(mockEvent);

      const result = await service.maintainEdit('event1', callUser);

      expect(result).toBe(expected);
    });
  });
});
