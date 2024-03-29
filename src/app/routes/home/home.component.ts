import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { SnackbarService } from './../../services/snackbar.service';
import { InventoryService } from './../../services/inventory.service';
import { Product } from './../../models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products$: Observable<any>;
  product: Product;
  constructor(
    public invService: InventoryService,
    public snackBar: SnackbarService
  ) {}

  ngOnInit() {
    this.products$ = this.invService.getItems();
  }

  onSubmit() {
    // this.invService.addProduct(this.productForm.value).then(res => {
    //   this.snackBar.show(`You've added to the inventory.`, 'OK');
    // });
  }
}
