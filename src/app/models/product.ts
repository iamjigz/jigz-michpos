export interface Product extends Item {
  qty: number;
  distributor: string;
  listPrice: number;
  basePrice: number;
  expiry: Date;
  timestamp?: Date;
}

export interface Item {
  id: string;
  name: string;
  genericName?: string;
  description?: string;
}
