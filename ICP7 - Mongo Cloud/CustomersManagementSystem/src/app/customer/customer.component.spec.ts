import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { RouterLinkStubDirective } from '../testing-stub/router-stubs';
import { CustomerComponent } from './customer.component';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

describe('CustomerComponent', () => {
  let component: CustomerComponent;
  let fixture: ComponentFixture<CustomerComponent>;
  let api: ApiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerComponent, RouterLinkStubDirective ],
      providers: [ ApiService, HttpClient, HttpHandler ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    api = TestBed.get(ApiService);
    fixture = TestBed.createComponent(CustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit should call getCustomers method in ApiService', () => {
    let customers = [
      {
        name: {
          first: "test"
        }
      }
    ];
    spyOn(api, 'getCustomers').and.returnValue(Observable.create(customers));
    component.ngOnInit();
    expect(api.getCustomers).toHaveBeenCalled();
  });
});
