import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { UserDetailComponent } from './user-detail.component';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let api: ApiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ UserDetailComponent ],
      providers: [ ApiService, HttpClient, HttpHandler ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    api = TestBed.get(ApiService);
    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit should call getUserDetails method', () => {
    spyOn(component, 'getUserDetails');
    component.ngOnInit();
    expect(component.getUserDetails).toHaveBeenCalled();
  });

  it('#getUserDetails should call getUser method in ApiService', () => {
    let id = "id";
    let user = {
        name: {
          first: "test"
        }
      };
    spyOn(api, 'getUser').and.callThrough();
    component.getUserDetails(id);
    expect(api.getUser).toHaveBeenCalled();
  });
});
