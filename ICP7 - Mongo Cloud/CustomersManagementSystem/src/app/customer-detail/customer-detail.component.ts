import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  customer = {};

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) {
  }

  ngOnInit() {
    this.getCustomerDetails(this.route.snapshot.params['id']);
  }

  getCustomerDetails(id) {
    this.api.getCustomer(id)
      .subscribe(data => {
        console.log(data);
        this.customer = data;
      });
  }

  deleteCustomer(id) {
    this.api.deleteCustomer(id)
      .subscribe(res => {
          this.router.navigate(['/customers']);
        }, (err) => {
          console.log(err);
        }
      );
  }

}
