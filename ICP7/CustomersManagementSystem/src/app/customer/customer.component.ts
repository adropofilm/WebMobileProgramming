import {Component, OnInit} from '@angular/core';

import {ApiService} from '../api.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customers: any;

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.api.getCustomers()
      .subscribe(res => {
        console.log(res);
        this.customers = res;
      }, err => {
        console.log(err);
      });
  }

}
