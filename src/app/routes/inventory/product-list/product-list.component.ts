import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { SnackbarService } from './../../../services/snackbar.service';
import { InventoryService } from './../../../services/inventory.service';
import { Product } from './../../../models/product';

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
    return this.dialogRef.close();
  }

  formatDate(timestamp): void {
    return timestamp.toDate();
  }

  save(data) {
    // TODO: patchValue
  }
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  filteredProducts: Product[];
  search = new FormControl('');
  options: string[];
  filteredOptions: Observable<string[]>;
  branchOptions: Array<any> = [];
  selectedBranch = 'Main';

  constructor(
    public invService: InventoryService,
    public snackBar: SnackbarService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this._filterByBranch();
    this._listBranches();

    this.filteredOptions = this.search.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _listBranches(): void {
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
      this.branchOptions = options.filter(this._onlyUnique); // get unique values
    });
  }

  private _filterByBranch(): void {
    this.invService.getItems().subscribe(data => {
      return (this.products = this.filteredProducts = data
        .map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Product;
        })
        .filter(
          option =>
            option.branch.toLowerCase() === this.selectedBranch.toLowerCase()
        ));
    });
  }

  private _onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    if (this.products) {
      this.options = this.products.reduce((prevValue, item: any) => {
        return [...prevValue, ...item.name];
      }, []);

      return this.options.filter(option =>
        option.toLowerCase().includes(filterValue)
      );
    }

    return [];
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

  selectItem($event: MatAutocompleteSelectedEvent): void {
    this.filteredProducts = this.products.filter(
      option => option.name.toLowerCase() === $event.option.value.toLowerCase()
    );
  }

  clearSearch(): void {
    this.search.setValue('');
    this.filteredProducts = this.products;
  }

  update(data: Product): void {
    return this.openDialog(data);
  }
}
