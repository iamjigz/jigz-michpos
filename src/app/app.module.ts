import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './modules/material.module';
import { FirebaseModule } from './modules/firebase.module';
import { FontawesomeModule } from './modules/fontawesome.module';
import { AngularFireModule } from '@angular/fire';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexModule } from '@angular/flex-layout/flex';
import { GridModule } from '@angular/flex-layout/grid';

import { AppComponent } from './app.component';
import { LoginComponent } from './routes/login/login.component';
import { HomeComponent } from './routes/home/home.component';
import { DashboardComponent } from './routes/admin/dashboard/dashboard.component';
import { NavComponent } from './routes/_partials/nav/nav.component';
import { TableComponent } from './routes/inventory/table/table.component';
import { InventoryComponent } from './routes/inventory/inventory.component';

import { environment } from './../environments/environment';
import { ListInventoryComponent } from './routes/inventory/list-inventory/list-inventory.component';
import {
  ProductListComponent,
  ProductListDialogComponent
} from './routes/inventory/product-list/product-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavComponent,
    TableComponent,
    InventoryComponent,
    LoginComponent,
    HomeComponent,
    ListInventoryComponent,
    ProductListComponent,
    ProductListDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    FirebaseModule,
    FlexLayoutModule,
    FlexModule,
    GridModule,
    FontawesomeModule,
    FontawesomeModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ProductListDialogComponent]
})
export class AppModule {}
