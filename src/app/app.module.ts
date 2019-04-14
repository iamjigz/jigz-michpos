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

import { environment } from './../environments/environment';

import { AppComponent } from './app.component';
import { LoginComponent } from './routes/login/login.component';
import { HomeComponent } from './routes/home/home.component';
import { DashboardComponent } from './routes/admin/dashboard/dashboard.component';
import { NavComponent } from './routes/_partials/nav/nav.component';
import { InventoryComponent } from './routes/inventory/inventory.component';
import {
  ProductListComponent,
  ProductListDialogComponent
} from './routes/inventory/product-list/product-list.component';
import { ProductFormComponent } from './routes/inventory/product-form/product-form.component';
import { ProductTableComponent } from './routes/inventory/product-table/product-table.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavComponent,
    InventoryComponent,
    LoginComponent,
    HomeComponent,
    ProductListComponent,
    ProductListDialogComponent,
    ProductFormComponent,
    ProductTableComponent
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
