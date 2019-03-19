import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

import {ApiService} from '../api.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  customerForm: FormGroup;

  id: string = '';
  firstName: string = '';
  lastName: string = '';
  gender: string = '';
  birthday: string = '';
  lastContact: string = '';
  customerLifetimeValue: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getCustomer(this.id);

    this.customerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      birthday: ['', Validators.required],
      lastContact: ['', Validators.required],
      customerLifetimeValue: ['', Validators.required],
    });
  }

  getCustomer(id) {
    /*** Get the Customer Details*/
    this.api.getCustomer(id)
      .subscribe(data => {
        this.gender = data.gender;
        this.birthday = data.birthday;
        this.lastContact = data.lastContact;
        this.customerLifetimeValue = data.customerLifetimeValue;
        this.firstName = data.name.first;
        this.lastName = data.name.last;
      });
  }

  // getter for form fields
  get f() {
    return this.customerForm.controls;
  }

  onSubmit(form:NgForm) {
    /*** On form submit update the customer details*/
    let customer: object = {};
    customer['customerID'] = this.id;
    customer['name'] = {
      first: this.customerForm.value.firstName,
      last: this.customerForm.value.lastName
    };
    customer['gender'] = this.customerForm.value.gender;
    customer['birthday'] = this.customerForm.value.birthday;
    customer['lastContact'] = this.customerForm.value.lastContact;
    customer['customerLifetimeValue'] = this.customerForm.value.customerLifetimeValue;
    console.log(customer);

    this.api.updateCustomer(this.id, form)
      .subscribe(res => {
        let id = res['_id'];
        this.router.navigate(['/customer-details', id]);
      }, (err) => {
        console.log(err);
      });
  }

  customerDetails() {
    this.router.navigate(['/customer-details', this.id]);
  }
}
