import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

export interface Transaction {
  id?: string;
  item: string;
  cost: number;
}

/** Constants used to fill up our data base. */
const TRANSACTIONS: Transaction[] = [
  { item: 'Beach ball', cost: 4 },
  { item: 'Towel', cost: 5 },
  { item: 'Frisbee', cost: 2 },
  { item: 'Sunscreen', cost: 4 },
  { item: 'Cooler', cost: 25 },
  { item: 'Swim suit', cost: 15 }
];

const COLORS: string[] = [
  'maroon',
  'red',
  'orange',
  'yellow',
  'olive',
  'green',
  'purple',
  'fuchsia',
  'lime',
  'teal',
  'aqua',
  'blue',
  'navy',
  'black',
  'gray'
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'item', 'cost'];
  transactions = TRANSACTIONS;
  mockData = [];
  dataSource: MatTableDataSource<Transaction>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    // Create 100 transactions
    this.mockData = Array.from({ length: 100 }, (_, k) =>
      mockTransaction(k + 1)
    );

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.mockData);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.mockData
      .map(t => t.cost)
      .reduce((acc, value) => acc + value, 0);
  }
}

/** Builds and returns a new transaction. */
function mockTransaction(id: number): Transaction {
  const item =
    COLORS[Math.round(Math.random() * (COLORS.length - 1))] +
    ' ' +
    TRANSACTIONS[Math.round(Math.random() * (TRANSACTIONS.length - 1))].item;

  return {
    id: id.toString(),
    item: item.toLocaleUpperCase(),
    cost: Math.round(Math.random() * 100)
  };
}
