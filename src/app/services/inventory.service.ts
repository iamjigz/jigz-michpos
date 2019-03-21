import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Product } from './../models/product';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private productCollection: AngularFirestoreCollection<Product>;
  products$: Observable<Product[]>;

  constructor(private afs: AngularFirestore) {
    this.productCollection = afs.collection<Product>('products');
    this.products$ = this.productCollection.valueChanges();
  }

  listProducts(): Observable<Product[]> {
    return this.products$;
  }

  addProduct(product: Product) {
    return this.productCollection.add(product);
  }
}
