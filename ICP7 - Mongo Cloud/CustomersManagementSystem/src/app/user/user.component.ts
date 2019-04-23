import {Component, OnInit} from '@angular/core';

import {ApiService} from '../api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: any;

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.api.getUsers()
      .subscribe(res => {
        console.log(res);
        this.user = res;
      }, err => {
        console.log(err);
      });
  }

}
