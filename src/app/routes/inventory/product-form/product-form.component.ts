import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';

import { SnackbarService } from './../../../services/snackbar.service';
import { InventoryService } from './../../../services/inventory.service';
import { Product } from './../../../models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  data: Product;
  form;

  constructor(
    public invService: InventoryService,
    public snackBar: SnackbarService
  ) {
    this.form = this.invService.productForm;
  }

  ngOnInit() {}

  addItem() {
    const data = this.form.value;

    return this.invService.createItem(data).then(res => {
      /*do something here.... maybe clear the form or give a success message*/
      this.snackBar.show(`You've added a new item.`, 'OK');
    });
  }
}
