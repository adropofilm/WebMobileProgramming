import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user = {};

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) {
  }

  ngOnInit() {
    this.getUserDetails(this.route.snapshot.params['id']);
  }

  getUserDetails(id) {
    this.api.getUser(id)
      .subscribe(data => {
        console.log(data);
        this.user = data;
      });
  }

  deleteUser(id) {
    this.api.deleteUser(id)
      .subscribe(res => {
          this.router.navigate(['/users']);
        }, (err) => {
          console.log(err);
        }
      );
  }

}
