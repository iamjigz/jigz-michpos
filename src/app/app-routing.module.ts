import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './routes/login/login.component';
import { HomeComponent } from './routes/home/home.component';
import { DashboardComponent } from './routes/admin/dashboard/dashboard.component';
import { InventoryComponent } from './routes/inventory/inventory.component';
import { TransactionsComponent } from './routes/transactions/transactions.component';

import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'inventory',
    component: InventoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'transactions',
    component: TransactionsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
