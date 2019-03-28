import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';

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
  search = new FormControl();
  filteredOptions: Observable<string[]>;
  branchOptions: Array<any> = [];

  constructor(
    public invService: InventoryService,
    public snackBar: SnackbarService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.branchItems('Main');
  }

  private listBranches() {
    this.invService.getItems().subscribe(data => {
      const options: Array<string> = this.products.reduce(
        (prevValue, item: any) => {
          return [...prevValue, ...item.branch];
        },
        []
      );
      this.branchOptions = options.filter(this.onlyUnique); // get unique values
    });
  }

  private branchItems(branch: string) {
    this.invService.getItemsByBranch(branch).subscribe(data => {
      this.products = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Product;
      });
    });
  }

  private onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  openDialog(item: Product): void {
    const dialogRef = this.dialog.open(ProductListDialogComponent, {
      height: 'auto',
      width: '600px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
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
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
