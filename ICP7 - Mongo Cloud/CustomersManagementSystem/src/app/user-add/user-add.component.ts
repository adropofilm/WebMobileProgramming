import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {ApiService} from '../api.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  userForm: FormGroup;
  submitted = false;

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      username: ['', Validators.required],
    });
  }

  // getter for form fields
  get f() {
    return this.userForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    let user: object = {};
    user['userID'] = 15;
    user['name'] = {
      first: this.userForm.value.firstName,
      last: this.userForm.value.lastName
    };
    user['username'] = this.userForm.value.username;
    user['password'] = this.userForm.value.password;
    console.log(user);

    this.api.postUser(user)
      .subscribe(res => {
        let id = res['_id'];
        this.router.navigate(['/user-details', id]);
      }, (err) => {
        console.log(err);
      });
  }

  onReset() {
    this.submitted = false;
    this.userForm.reset();
  }

}
