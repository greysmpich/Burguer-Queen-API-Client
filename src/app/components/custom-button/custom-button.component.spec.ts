import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomButtonComponent } from './custom-button.component';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppRoutingModule } from 'src/app/app-routing.module';


describe('CustomdButtonComponent', () => {
  let component: CustomButtonComponent;
  let fixture: ComponentFixture<CustomButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomButtonComponent ],
      imports: [HttpClientTestingModule,  AppRoutingModule  ],
      providers: [OrdersService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
