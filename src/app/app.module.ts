import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './modules/material.module';
import { LayoutModule } from '@angular/cdk/layout';

import { AppComponent } from './app.component';
import { DashboardComponent } from './routes/admin/dashboard/dashboard.component';
import { NavComponent } from './routes/_partials/nav/nav.component';
import { TableComponent } from './routes/inventory/table/table.component';
import { InventoryComponent } from './routes/inventory/inventory.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavComponent,
    TableComponent,
    InventoryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
