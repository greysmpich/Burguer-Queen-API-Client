import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LogoutComponent } from './logout.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationServiceService } from 'src/app/services/authentication/authentication-service.service';
import { Router } from '@angular/router';
describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;
  let service: AuthenticationServiceService;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoutComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        AuthenticationServiceService, 
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(AuthenticationServiceService);
    router = TestBed.inject(Router)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should redirect to /login if button Log Out is clicked', inject([AuthenticationServiceService], (service: AuthenticationServiceService) => {
    const email = 'correcto@example.com';
    const password = 'contraseñaCorrecta';
    const navigateSpy = spyOn(router, 'navigate');
    service.login(email, password).subscribe((result) => {
      expect(result.accessToken).toBe('token');
      expect(result.user.email).toBe(email);
      expect(result.user.role).toBe('user');
    });
    component.logOut()
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  }));
 

});
