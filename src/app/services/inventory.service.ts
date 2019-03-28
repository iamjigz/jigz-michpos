import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
    name: ['', Validators.required],
    generic: ['', Validators.required],
    distributor: ['', Validators.required],
    description: ['', Validators.required],
    qty: ['', Validators.required],
    expiry: ['', Validators.required],
    listPrice: ['', Validators.required],
    retailPrice: ['', Validators.required],
    branch: ['Main', Validators.required]
  });

  constructor(private fb: FormBuilder, private afs: AngularFirestore) {
    this.productCollection = afs.collection<Product>('inventory');
    this.products$ = this.productCollection.valueChanges();
  }

  getItems() {
    return this.productCollection.snapshotChanges();
  }

  getItemsByBranch(branch: string): Observable<any> {
    return this.afs
      .collection('inventory', ref =>
        ref.where('branch', '==', branch).orderBy('name')
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
