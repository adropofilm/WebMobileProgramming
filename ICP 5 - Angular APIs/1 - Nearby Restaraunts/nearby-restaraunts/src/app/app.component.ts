import { Component , ElementRef, ViewChild } from '@angular/core';
import { HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private _http: HttpClient) {}
  @ViewChild('searchText') searchTerm: ElementRef;
  pages: any;
  title = 'FoodNears';

  submit () {
    this._http.jsonp('https://api.foursquare.com/v2/venues/explore?near=' + this.searchTerm.nativeElement.value + '&section=food&client_id=AQV0XHCNL3SGIFLOIQQNDPIQ2KX3SUU0TZCZUTAFTTR40HYC&client_secret=MPJ5EH5CQF2HBF5RI0SGZQBDDYZYFSNTFDSTHVCYRWBCB2VM&v=20190224', 'callback')
    .subscribe((data: any) => {
        this.pages = Object.keys(data['response']['groups'][0]['items']).map(function (k) {
          var i = data['response']['groups'][0]['items'][k];
          return {venue: i.venue}
        });
        console.log(this.pages);
    });
  }

}
