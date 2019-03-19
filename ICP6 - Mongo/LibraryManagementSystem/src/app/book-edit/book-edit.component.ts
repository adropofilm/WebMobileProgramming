import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../api.service';
import {FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  bookForm: FormGroup;
  isbn: string = '';
  title: string = '';
  description: string = '';
  author: string = '';
  publisher: string = '';
  published_year: string = '';
  id: string = '';

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getBookDetails(this.id);

    this.bookForm = this.formBuilder.group({
      'isbn': [null, Validators.required],
      'title': [null, Validators.required],
      'description': [null, Validators.required],
      'author': [null, Validators.required],
      'publisher': [null, Validators.required],
      'published_year': [null, Validators.required]
    });

  }

  getBookDetails(id) {
    this.api.getBook(id)
      .subscribe(data => {
        this.isbn = data.isbn;
        this.title = data.title;
        this.description = data.description;
        this.author = data.author;
        this.publisher = data.publisher;
        this.published_year = data.published_year;
        console.log(this.title);
      });
  }

  onFormSubmit(form: NgForm) {
    this.api.updateBook(this.id, form)
      .subscribe(res => {
        let id = res['_id'];
        this.router.navigate(['/book-details', id]);
      }, (err) => {
        console.log(err);
      });
  }

}
