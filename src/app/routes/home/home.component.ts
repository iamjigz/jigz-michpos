import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

import { SnackbarService } from './../../services/snackbar.service';
import { InventoryService } from './../../services/inventory.service';
import { Product } from './../../models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products$: Observable<Product[]>;
  product: Product;
  productForm = new FormGroup({
    name: new FormControl(''),
    stock: new FormControl(''),
    sellPrice: new FormControl('')
  });
  constructor(
    public invService: InventoryService,
    public snackBar: SnackbarService
  ) {}

  ngOnInit() {
    this.products$ = this.invService.listProducts();
  }

  onSubmit() {
    console.log(this.productForm.value);
    this.invService.addProduct(this.productForm.value).then(res => {
      this.snackBar.show(`You've added to the inventory.`, 'OK');
    });
  }
}
