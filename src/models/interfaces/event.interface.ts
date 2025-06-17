export interface IEvent {
  id: string;
  name: string;
  maxQuantity: number;
  editingBy: string;
  editingExpiredAt: Date | null;
}
