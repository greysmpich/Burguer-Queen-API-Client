import { ComponentFixture, TestBed, tick, fakeAsync, inject  } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationComponent } from './authentication.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationServiceService } from '../services/authentication/authentication-service.service';
//import { Router } from '@angular/router';
//import { NgZone } from '@angular/core';

describe('AuthenticationComponent', () => {
  let component: AuthenticationComponent;
  let fixture: ComponentFixture<AuthenticationComponent>;
  let authService: AuthenticationServiceService;
  let authServiceSpy: jasmine.SpyObj<AuthenticationServiceService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthenticationComponent ],
      providers: [AuthenticationServiceService],
      imports: [HttpClientTestingModule, RouterTestingModule],
    })
    .compileComponents();
    fixture = TestBed.createComponent(AuthenticationComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthenticationServiceService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it(`should have as title "Burguer Queen"`, () => {
    const fixture = TestBed.createComponent(AuthenticationComponent);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.title')?.textContent).toContain('Burguer Queen');
  });

  it(`should have a Logo`, () => {
    const fixture = TestBed.createComponent(AuthenticationComponent);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.logoBurgerQueen')?.tagName.toLowerCase()).toContain('img');
  });
  it(`should have a container for the credentials`, () => {
    const fixture = TestBed.createComponent(AuthenticationComponent);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.containerLogin')?.tagName.toLowerCase()).toContain('div');
  });
  it(`should have two inputs for email and password`, () => {
    const fixture = TestBed.createComponent(AuthenticationComponent);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('input').length).toBe(2);
  });
  
  it(`should have a button to Login`, () => {
    const fixture = TestBed.createComponent(AuthenticationComponent);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#buttonLogin')).toBeTruthy();;
  });
  it('should call the login function when clicking Login', fakeAsync(() => {
    const authService = TestBed.inject(AuthenticationServiceService);
    const spyLogin = spyOn(authService, 'login').and.callThrough();
    component.serviceLogin();
    tick();
    expect(spyLogin).toHaveBeenCalled();
  }));
  it('should call login service on serviceLogin', () => {
    const userData = { user: { role: 'admin' }, accessToken: 'token123' };
    spyOn(authService, 'login').and.returnValue(of(userData));
    spyOn(authService, 'setUserRole');
    spyOn(authService, 'redirectToRoleSpecificScreen');
    spyOn(authService, 'getToken');

    component.email = 'test@example.com';
    component.password = 'password';
    component.serviceLogin();
 
    expect(authService.login).toHaveBeenCalledWith('test@example.com', 'password');
    expect(authService.setUserRole).toHaveBeenCalledWith('admin');
    expect(authService.getToken).toHaveBeenCalledWith('token123');
    expect(authService.redirectToRoleSpecificScreen).toHaveBeenCalled();
  });
  it('should handle login error', () => {
    spyOn(authService, 'login').and.returnValue(throwError(() => ({ error: 'Login failed' })));
    component.email = 'test@example.com';
    component.password = 'password';
    component.serviceLogin();
    expect(authService.login).toHaveBeenCalledWith('test@example.com', 'password');
    expect(component.errorMessage).toEqual('Login failed');
    });

    it('should show password after eyeButton clicked', () => {
    component.showPassword = false; // Assume initial state
    component.passwordVisibility();
    expect(component.showPassword).toBe(true);
    expect(component.eyeImageSource).toBe('../../assets/images/show.png');
  });
  it('should hide password after eyeButton clicked for second time', () => {
    component.showPassword = true; 
    component.passwordVisibility();
    expect(component.showPassword).toBe(false);
    expect(component.eyeImageSource).toBe('../../assets/images/hide.png');
  });
});
