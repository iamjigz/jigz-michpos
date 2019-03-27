import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';

import { SnackbarService } from './../../../services/snackbar.service';
import { InventoryService } from './../../../services/inventory.service';
import { Product } from './../../../models/product';

import { switchMap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.scss']
})
export class AddInventoryComponent implements OnInit {
  results$: Observable<Product[]>;
  products$: Observable<Product[]>;
  offset = new Subject<string>();

  product: Product;

  productForm = new FormGroup({
    distrib: new FormControl(''),
    name: new FormControl(''),
    desc: new FormControl(''),
    qty: new FormControl('')
  });

  constructor(
    private afs: AngularFirestore,
    public invService: InventoryService,
    public snackBar: SnackbarService
  ) {}

  ngOnInit() {
    this.results$ = this.search();
  }

  // Form event handler
  onkeyup(e) {
    this.offset.next(e.target.value.toLowerCase());
  }

  // Reactive search query
  search(): Observable<any> {
    return this.offset.pipe(
      filter(val => !!val), // filter empty strings
      switchMap(offset => {
        return this.afs
          .collection('inventory', ref =>
            ref.orderBy(`searchableIndex.${offset}`).limit(5)
          )
          .valueChanges();
      })
    );
  }

  onSubmit() {
    // this.invService.addProduct(this.productForm.value).then(res => {
    //   this.snackBar.show(`You've added to the inventory.`, 'OK');
    // });
  }
}
