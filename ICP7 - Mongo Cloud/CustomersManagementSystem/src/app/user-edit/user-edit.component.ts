import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

import {ApiService} from '../api.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  userForm: FormGroup;

  id: string = '';
  firstName: string = '';
  lastName: string = '';
  username: string = '';
  password: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getUser(this.id);

    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  getUser(id) {
    /*** Get the user Details*/
    this.api.getUser(id)
      .subscribe(data => {
        this.username = data.username;
        this.password = data.password;
        this.firstName = data.name.first;
        this.lastName = data.name.last;
      });
  }

  // getter for form fields
  get f() {
    return this.userForm.controls;
  }

  onSubmit(form:NgForm) {
    /*** On form submit update the user details*/
    let user: object = {};
    user['userID'] = this.id;
    user['name'] = {
      first: this.userForm.value.firstName,
      last: this.userForm.value.lastName
    };
    user['username'] = this.userForm.value.username;
    user['password'] = this.userForm.value.password;
    console.log(user);

    this.api.updateUser(this.id, form)
      .subscribe(res => {
        let id = res['_id'];
        this.router.navigate(['/user-details', id]);
      }, (err) => {
        console.log(err);
      });
  }

  userDetails() {
    this.router.navigate(['/user-details', this.id]);
  }
}
