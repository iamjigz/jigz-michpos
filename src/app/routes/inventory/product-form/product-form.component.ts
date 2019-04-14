import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { SnackbarService } from './../../../services/snackbar.service';
import { InventoryService } from './../../../services/inventory.service';
import { Product } from './../../../models/product';
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  products: Product[];
  filteredProducts: Product[];
  options: string[];
  filteredOptions: Observable<string[]>;
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
    this.getItems();

    const search = this.form.controls.name;

    if (!search.value) {
      this.filteredOptions = search.valueChanges.pipe(
        startWith(''),
        map((value: string) => this._filter(value))
      );
    }
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

  private getItems() {
    this.invService.getItems().subscribe(data => {
      this.products = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Product;
      });
    });
  }

  selectItem($event: MatAutocompleteSelectedEvent) {
    this.filteredProducts = this.products.filter(
      option => option.name.toLowerCase() === $event.option.value.toLowerCase()
    );

    if (this.filteredProducts) {
      const data = this.filteredProducts[0];

      this.form.patchValue({
        name: data.name,
        generic: data.generic,
        distributor: data.distributor,
        description: data.description,
        branch: data.branch,
        listPrice: data.listPrice,
        retailPrice: data.retailPrice
      });
    }
  }

  addItem() {
    const data = this.form.value;

    return this.invService.createItem(data).then(res => {
      /*do something here.... maybe clear the form or give a success message*/
      this.snackBar.show(`You've added a new item.`, 'OK');
    });
  }
}
