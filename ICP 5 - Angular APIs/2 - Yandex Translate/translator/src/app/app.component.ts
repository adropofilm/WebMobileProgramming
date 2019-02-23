import { Component, NgModule, ElementRef, ViewChild } from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import { Language } from './language'
import { HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'translator';
  constructor(private _http: HttpClient) {}
  languageFrom: string;
  languageTo: string;
  translation: string;
  @ViewChild('translateText') translateText: ElementRef;
  languages = [
    new Language('en', 'english'),
    new Language('ru', 'russian'),
    new Language('pl', 'polish'),
    new Language('es', 'spanish'),
    new Language('zh', 'chinese'),
    new Language('vi', 'vietnamese'),
    new Language('sw', 'swahili'),
    new Language('fr', 'french')
  ];

  submit () {
    this._http.jsonp(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190223T090247Z.8bc4055d52f498ad.42bad24ba85752ce63d458cf2ee8d4a9cf274069&text=${this.translateText.nativeElement.value}&lang=${this.languageFrom}-${this.languageTo}`, 'callback')
    .subscribe((data: any) => {
        this.translation = data['text'][0];
    });
  }

}
