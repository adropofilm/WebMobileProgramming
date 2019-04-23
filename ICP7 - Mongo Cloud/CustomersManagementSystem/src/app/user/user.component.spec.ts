import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { RouterLinkStubDirective } from '../testing-stub/router-stubs';
import { UserComponent } from './user.component';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let api: ApiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserComponent, RouterLinkStubDirective ],
      providers: [ ApiService, HttpClient, HttpHandler ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    api = TestBed.get(ApiService);
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit should call getUsers method in ApiService', () => {
    let users = [
      {
        name: {
          first: "test"
        }
      }
    ];
    spyOn(api, 'getUsers').and.returnValue(Observable.create(user));
    component.ngOnInit();
    expect(api.getUsers).toHaveBeenCalled();
  });
});
