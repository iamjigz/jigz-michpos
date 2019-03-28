import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import {
  AngularFirestore,
  AngularFirestoreDocument,
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
  productForm = this.fb.group({
    name: [''],
    description: [''],
    qty: [''],
    distributor: ['']
  });

  constructor(private fb: FormBuilder, private afs: AngularFirestore) {
    this.productCollection = afs.collection<Product>('inventory');
    this.products$ = this.productCollection.valueChanges();
  }

  getItems() {
    return this.productCollection.snapshotChanges();
  }

  filterItems(search: string): Observable<any> {
    return this.afs
      .collection('inventory', ref =>
        ref
          .orderBy('name')
          .startAt(search)
          .endAt(search + '\uf8ff')
      )
      .valueChanges();
  }

  createItem(item: Product) {
    return new Promise<any>((resolve, reject) => {
      this.productCollection.add(item).then(res => {}, err => reject(err));
    });
  }

  updateItem(item, update: Product) {
    return this.productCollection.doc(item.id).set(update, { merge: true });
  }

  deleteItem(item) {
    return this.productCollection.doc(item.payload.doc.id).delete();
  }
}
