export interface IEvent {
  id: string;
  title: string;
  description: string;
  quantity: number;
  status: boolean | null;
  start: Date;
  end: Date;
  editingBy: string;
  editingExpiredAt: Date | null;
}
