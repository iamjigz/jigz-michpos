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
    desc: [''],
    qty: [''],
    distrib: ['']
  });

  constructor(private fb: FormBuilder, private afs: AngularFirestore) {
    this.productCollection = afs.collection<Product>('inventory');
    this.products$ = this.productCollection.valueChanges();
  }

  getItems() {
    return this.productCollection.snapshotChanges();
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
