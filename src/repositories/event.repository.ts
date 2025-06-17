import BaseRepository from './base.repository';
import { EventModel, IEventDocument } from '../models/event.model';

export class EventRepository extends BaseRepository<IEventDocument> {
  constructor() {
    super(EventModel);
  }
}
