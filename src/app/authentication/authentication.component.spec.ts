import { ComponentFixture, TestBed, tick, fakeAsync  } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationComponent } from './authentication.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationServiceService } from '../services/authentication-service.service';
//import { MockAuthService } from '../services/mockAuthService';
//import { Router } from '@angular/router';
//import { NgZone } from '@angular/core';

describe('AuthenticationComponent', () => {
  let component: AuthenticationComponent;
  let fixture: ComponentFixture<AuthenticationComponent>;
 // let authService: AuthenticationServiceService;
  let authServiceSpy: jasmine.SpyObj<AuthenticationServiceService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthenticationServiceService', ['login', 'setUserRole']);
    await TestBed.configureTestingModule({
      declarations: [ AuthenticationComponent ],
      providers: [
        { provide: AuthenticationServiceService, useValue: authServiceSpy },
       // { provide: Router, useValue: {} },
      ],
      imports: [HttpClientTestingModule, RouterTestingModule],
    })
    .compileComponents();
    fixture = TestBed.createComponent(AuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  ///

  // it('should call serviceLogin and set userData on successful login', () => {
  //   authServiceSpy.login.and.returnValue(of({ accessToken: 'token', user: {email: 'user@gmail.com', role: 'user', id: 1 } }));
 
  //   //const loginSpy = spyOn(authService, 'login').and.callThrough();
  //   //component.email = 'correcto@example.com';
  //   //component.password = 'contraseñaCorrecta';
  //   //component.serviceLogin();
  //  // const userData = component.getUserData();
  //   expect(authServiceSpy.login).toHaveBeenCalled();
  //  // expect(userData).toBeDefined();
  // });


  
  it('should call serviceLogin and set userData on successful login', fakeAsync(() => {
    // Configurar el comportamiento del spy para devolver un observable simulado
    authServiceSpy.login.and.returnValue(of({ accessToken: 'token', user: {email: 'user@gmail.com', role: 'user', id: 1 } }));
  // También es necesario configurar el espía para setUserRole
  authServiceSpy.setUserRole.and.stub();
  authServiceSpy.redirectToRoleSpecificScreen.and.stub();
  //authServiceSpy.setUserRole.and.stub();
    // Llamar al método que quieres probar (serviceLogin)
   // component.serviceLogin();
    // Esperar a que las operaciones asíncronas se completen
    tick();
   // const userData = component.getUserData();
    // Verificar que el método login del servicio fue llamado
    expect(authServiceSpy.setUserRole).toHaveBeenCalled();
    expect(authServiceSpy.redirectToRoleSpecificScreen).toHaveBeenCalled();
   
    // Verificar que el userData fue establecido correctamente
    //expect(userData).toEqual({ accessToken: 'token', user: {email: 'user@gmail.com', role: 'user', id: 1 } });
  }));
  // it('should handle login error and set errorMessage', () => {
  //   const loginSpy = spyOn(authService, 'login').and.returnValue(throwError({ error: 'Credenciales incorrectas' }));
  //   component.email = 'incorrecto@example.com';
  //   component.password = 'contraseñaIncorrecta';

  //   component.serviceLogin();

  //   expect(loginSpy).toHaveBeenCalledWith('incorrecto@example.com', 'contraseñaIncorrecta');
  //   expect(component.errorMessage).toBe('Credenciales incorrectas');
  // });
  ////
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

});
