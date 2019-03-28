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
  branchOptions: Array<any> = [];
  form;

  constructor(
    public invService: InventoryService,
    public snackBar: SnackbarService
  ) {
    this.form = this.invService.productForm;
  }

  ngOnInit() {
    this.listBranches();
  }

  private listBranches() {
    this.invService.getItems().subscribe(data => {
      const items = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Product;
      });

      const options: Array<string> = items.reduce((prevValue, item: any) => {
        return [...prevValue, ...item.branch];
      }, []);
      this.branchOptions = options.filter(this.onlyUnique); // get unique values
    });
  }

  private onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  addItem() {
    const data = this.form.value;

    return this.invService.createItem(data).then(res => {
      /*do something here.... maybe clear the form or give a success message*/
      this.snackBar.show(`You've added a new item.`, 'OK');
    });
  }
}
