import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {ApiService} from '../api.service';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {

  customerForm: FormGroup;
  submitted = false;

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.customerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      birthday: ['', Validators.required],
      lastContact: ['', Validators.required],
      customerLifetimeValue: ['', Validators.required],
    });
  }

  // getter for form fields
  get f() {
    return this.customerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.customerForm.invalid) {
      return;
    }
    let customer: object = {};
    customer['customerID'] = 15;
    customer['name'] = {
      first: this.customerForm.value.firstName,
      last: this.customerForm.value.lastName
    };
    customer['gender'] = this.customerForm.value.gender;
    customer['birthday'] = this.customerForm.value.birthday;
    customer['lastContact'] = this.customerForm.value.lastContact;
    customer['customerLifetimeValue'] = this.customerForm.value.customerLifetimeValue;
    console.log(customer);

    this.api.postCustomer(customer)
      .subscribe(res => {
        let id = res['_id'];
        this.router.navigate(['/customer-details', id]);
      }, (err) => {
        console.log(err);
      });
  }

  onReset() {
    this.submitted = false;
    this.customerForm.reset();
  }

}
