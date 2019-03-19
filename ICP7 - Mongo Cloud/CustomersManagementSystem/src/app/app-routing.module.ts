import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {CustomerComponent} from './customer/customer.component';
import {CustomerDetailComponent} from './customer-detail/customer-detail.component';
import {CustomerAddComponent} from './customer-add/customer-add.component';
import {CustomerEditComponent} from './customer-edit/customer-edit.component';

const appRoutes: Routes = [
  {
    path: 'customers',
    component: CustomerComponent,
    data: {title: 'Customers List'}
  },
  {
    path: 'customer-details/:id',
    component: CustomerDetailComponent,
    data: {title: 'Customer Details'}
  },
  {
    path: 'customer-add',
    component: CustomerAddComponent,
    data: {title: 'Add Customer'}
  },
  {
    path: 'customer-edit/:id',
    component: CustomerEditComponent,
    data: {title: 'Edit Book'}
  },
  {
    path: '',
    redirectTo: '/customers',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule {
}
