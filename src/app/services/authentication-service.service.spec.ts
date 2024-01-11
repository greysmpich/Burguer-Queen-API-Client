import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationServiceService } from './authentication-service.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MockAuthService } from './mockAuthService';

describe('AuthenticationServiceService', () => {
  let service: AuthenticationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule], 
      providers: [
        AuthenticationServiceService,
        MockAuthService, 
      ],
    });
    service = TestBed.inject(AuthenticationServiceService);
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
});
