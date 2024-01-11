import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationServiceService } from './authentication-service.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthenticationServiceService', () => {
  let service: AuthenticationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule], 
    });
    service = TestBed.inject(AuthenticationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
