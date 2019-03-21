export interface Product {
  id: string;
  name: string;
  stock: number;
  expiry?: Date;
  purchasePrice?: number;
  sellPrice?: number;
  distributor?: string;
}
