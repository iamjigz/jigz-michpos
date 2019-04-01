import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Product } from './../models/product';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private productCollection: AngularFirestoreCollection<Product>;
  products$: Observable<Product[]>;
  products: Observable<any>;
  productForm = this.fb.group({
    name: ['', Validators.required],
    generic: ['', Validators.required],
    distributor: ['', Validators.required],
    description: ['', Validators.required],
    qty: ['', Validators.required],
    expiry: ['', Validators.required],
    listPrice: ['', Validators.required],
    retailPrice: ['', Validators.required],
    branch: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private afs: AngularFirestore) {
    this.productCollection = afs.collection('inventory');
    this.products$ = this.productCollection.valueChanges().pipe(shareReplay(1));
    this.products = this.productCollection
      .snapshotChanges()
      .pipe(shareReplay(1));
  }

  getItems() {
    return this.products;
  }

  // getItemsByBranch(branch: string): Observable<any> {
  //   return this.afs
  //     .collection('inventory', ref =>
  //       ref.where('branch', '==', branch).orderBy('name')
  //     )
  //     .snapshotChanges();
  // }

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
