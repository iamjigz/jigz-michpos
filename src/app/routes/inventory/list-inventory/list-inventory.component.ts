import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { SnackbarService } from './../../../services/snackbar.service';
import { InventoryService } from './../../../services/inventory.service';
import { Product } from './../../../models/product';

@Component({
  selector: 'app-list-inventory',
  templateUrl: './list-inventory.component.html',
  styleUrls: ['./list-inventory.component.scss']
})
export class ListInventoryComponent implements OnInit {
  products$: Observable<Product[]>;
  products: Product[];
  form;
  constructor(
    public invService: InventoryService,
    public snackBar: SnackbarService
  ) {
    this.form = this.invService.productForm;
  }

  ngOnInit() {
    this.list();
  }

  list() {
    this.invService.getItems().subscribe(data => {
      this.products = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Product;
      });
    });
  }

  onSubmit() {
    const data = this.form.value;

    return this.invService.createItem(data).then(res => {
      /*do something here....
           maybe clear the form or give a success message*/
    });
  }

  update = data =>
    this.invService.updateItem(data, this.form.value).then(() => this.list())

  delete = data => this.invService.deleteItem(data);
}
