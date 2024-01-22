import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationServiceService } from './authentication-service.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('AuthenticationServiceService', () => {
  let service: AuthenticationServiceService;
  let router: Router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule], 
      providers: [
        AuthenticationServiceService, 
      ],
    });
    service = TestBed.inject(AuthenticationServiceService);
    router = TestBed.inject(Router);
  });
  
  it('should be created', inject([AuthenticationServiceService], (service: AuthenticationServiceService) => {
    expect(service).toBeTruthy();
  }));
  
  it('should mock the login function', inject([AuthenticationServiceService], (service: AuthenticationServiceService) => {
    const email = 'correcto@example.com';
    const password = 'contraseñaCorrecta';

    service.login(email, password).subscribe((result) => {
      expect(result.accessToken).toBe('token');
      expect(result.user.email).toBe(email);
      expect(result.user.role).toBe('user');
    });
  }));

  it('should mock the setUserRole function', inject([AuthenticationServiceService], (service: AuthenticationServiceService) => {
    const userInfo = { email: 'test@example.com', role: 'user', id: 1 };
    service.setUserRole(userInfo.role);

    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    expect(storedUser).toEqual(userInfo.role);
  }));
  it('should mock the getUserRole function', inject([AuthenticationServiceService], (service: AuthenticationServiceService) => {
    const userInfo = { email: 'test@example.com', role: 'user', id: 1 };
    localStorage.setItem('user', JSON.stringify(userInfo));
    const userRole = service.getUserRole();
    expect(userRole.role).toEqual(userInfo.role);
  }));

  it('should return an empty object when localStorage user is null', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    const result = service.getUserRole(); 

    expect(result).toEqual({});
  });

  it('should mock the clearUserRole function', inject([AuthenticationServiceService], (service: AuthenticationServiceService) => {
    const userInfo = { email: 'test@example.com', role: 'user', id: 1 };
    localStorage.setItem('user', JSON.stringify(userInfo));
    service.clearUserRole()
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    expect(storedUser).toEqual({});
   }));

  it('should redirect to /waiter if user role is waiter', inject([AuthenticationServiceService], (service: AuthenticationServiceService) => {
     spyOn(service, 'getUserRole').and.returnValue('waiter');
     const navigateSpy = spyOn(router, 'navigate');
     service.redirectToRoleSpecificScreen();
     expect(navigateSpy).toHaveBeenCalledWith(['/waiter']);
   }));
  
   it('should redirect to /kitchen if user role is chef', inject([AuthenticationServiceService], (service: AuthenticationServiceService) => {
    spyOn(service, 'getUserRole').and.returnValue('chef');
    const navigateSpy = spyOn(router, 'navigate');
    service.redirectToRoleSpecificScreen();
    expect(navigateSpy).toHaveBeenCalledWith(['/kitchen']);
  }));
 
});
