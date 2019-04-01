export interface Product extends Item {
  qty: number;
  distributor: string;
  listPrice: number;
  retailPrice: number;
  timestamp: any;
  branch: string;
}

export interface Item {
  id: string;
  name: string;
  generic: string;
  description: string;
  expiry: any;
}
