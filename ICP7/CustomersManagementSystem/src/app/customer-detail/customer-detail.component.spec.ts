import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { CustomerDetailComponent } from './customer-detail.component';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

describe('CustomerDetailComponent', () => {
  let component: CustomerDetailComponent;
  let fixture: ComponentFixture<CustomerDetailComponent>;
  let api: ApiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ CustomerDetailComponent ],
      providers: [ ApiService, HttpClient, HttpHandler ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    api = TestBed.get(ApiService);
    fixture = TestBed.createComponent(CustomerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit should call getCustomerDetails method', () => {
    spyOn(component, 'getCustomerDetails');
    component.ngOnInit();
    expect(component.getCustomerDetails).toHaveBeenCalled();
  });

  it('#getCustomerDetails should call getCustomer method in ApiService', () => {
    let id = "id";
    let customer = {
        name: {
          first: "test"
        }
      };
    spyOn(api, 'getCustomer').and.callThrough();
    component.getCustomerDetails(id);
    expect(api.getCustomer).toHaveBeenCalled();
  });
});