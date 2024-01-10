import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationComponent } from './authentication.component';

describe('AuthenticationComponent', () => {
  let component: AuthenticationComponent;
  let fixture: ComponentFixture<AuthenticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthenticationComponent ],
      imports: [HttpClientTestingModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticationComponent);
    component = fixture.componentInstance;
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
  
  // it(`the label for password should have a button to show and hide the password`, () => {
  //   const fixture = TestBed.createComponent(AuthenticationComponent);
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   const containerInputPassword = compiled.querySelector('.containerInputPassword');
  //   expect(containerInputPassword).toBeTruthy();
  //   const hideButton = containerInputPassword.querySelector('button.eyeHide');
  //   expect(hideButton).toBeTruthy();
  // });

  it(`should have a button to Login`, () => {
    const fixture = TestBed.createComponent(AuthenticationComponent);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#buttonLogin')).toBeTruthy();;
  });

});
