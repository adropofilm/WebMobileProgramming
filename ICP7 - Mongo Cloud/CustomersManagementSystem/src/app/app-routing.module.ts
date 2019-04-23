import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {UserComponent} from './user/user.component';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {UserAddComponent} from './user-add/user-add.component';
import {UserEditComponent} from './user-edit/user-edit.component';

const appRoutes: Routes = [
  {
    path: 'users',
    component: UserComponent,
    data: {title: 'Users List'}
  },
  {
    path: 'user-details/:id',
    component: UserDetailComponent,
    data: {title: 'User Details'}
  },
  {
    path: 'user-add',
    component: UserAddComponent,
    data: {title: 'Add User'}
  },
  {
    path: 'user-edit/:id',
    component: UserEditComponent,
    data: {title: 'Edit Book'}
  },
  {
    path: '',
    redirectTo: '/users',
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
