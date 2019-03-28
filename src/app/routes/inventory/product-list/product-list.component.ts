import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { SnackbarService } from './../../../services/snackbar.service';
import { InventoryService } from './../../../services/inventory.service';
import { Product } from './../../../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;
  products: Product[];

  constructor(
    public invService: InventoryService,
    public snackBar: SnackbarService,
    public dialog: MatDialog
  ) {}

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

  openDialog(item: Product): void {
    const reset: Product = {
      id: '',
      name: '',
      description: '',
      qty: 0,
      distributor: '',
      listPrice: 0.0,
      retailPrice: 0.0,
      expiry: new Date()
    };

    const dialogRef = this.dialog.open(ProductListDialogComponent, {
      height: 'auto',
      width: '600px',
      data: item ? item : reset
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  new() {
    this.openDialog({} as Product);
  }

  update(data: Product) {
    this.openDialog(data);
  }
}

@Component({
  selector: 'app-product-dialog',
  templateUrl: 'product-list-dialog.html'
})
export class ProductListDialogComponent {
  form;

  constructor(
    public invService: InventoryService,
    public dialogRef: MatDialogRef<ProductListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {
    this.form = this.invService.productForm;
    if (!data) {
      this.form = this.invService.productForm;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
