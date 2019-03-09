import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';

import {AppComponent} from './app.component';
import {CustomerComponent} from './customer/customer.component';
import {AppRoutingModule} from './app-routing.module';
import {AngularMaterialModule} from './angular-material/angular-material.module';
import {CustomerDetailComponent} from './customer-detail/customer-detail.component';
import {CustomerAddComponent} from './customer-add/customer-add.component';
import {CustomerEditComponent} from './customer-edit/customer-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    CustomerDetailComponent,
    CustomerAddComponent,
    CustomerEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularMaterialModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
