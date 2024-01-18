import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LogoutComponent } from './logout.component';
import { LogoutModalComponent } from '../logout-modal/logout-modal.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthenticationServiceService } from 'src/app/services/authentication/authentication-service.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;
  let service: AuthenticationServiceService;
  let router: Router;
  let matDialog: jasmine.SpyObj<MatDialog>;
  let matDialogRefMock: jasmine.SpyObj<MatDialogRef<LogoutModalComponent>>;
  
  beforeEach(async () => {
    matDialog = jasmine.createSpyObj('MatDialog', ['open']);
    matDialogRefMock = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);

    await TestBed.configureTestingModule({
      declarations: [ LogoutComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, MatDialogModule, AppRoutingModule],
      providers: [
        AuthenticationServiceService, 
        { provide: MatDialog, useValue: matDialog }
      ],
    })
    .compileComponents();

    service = TestBed.inject(AuthenticationServiceService);
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;  
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open LogoutModalComponent and handle "Cerrar Sesión" result', fakeAsync(() => {
    
    matDialogRefMock.afterClosed.and.returnValue(of('Cerrar Sesión'));

    matDialog.open.and.returnValue(matDialogRefMock);

    spyOn(service, 'clearUserRole').and.callThrough();
    spyOn(service, 'clearToken').and.callThrough();
    spyOn(router, 'navigate').and.callThrough();

    component.openLogoutConfirmationModal();
    tick(); 

    expect(service.clearUserRole).toHaveBeenCalled();
    expect(service.clearToken).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  }));

});
