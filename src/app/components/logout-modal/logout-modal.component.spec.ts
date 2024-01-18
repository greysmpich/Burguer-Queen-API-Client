import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LogoutModalComponent } from './logout-modal.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('LogoutModalComponent', () => {
  let component: LogoutModalComponent;
  let fixture: ComponentFixture<LogoutModalComponent>;
  let matDialogRefMock: jasmine.SpyObj<MatDialogRef<LogoutModalComponent>>;
  
  beforeEach(async () => {
    matDialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [ LogoutModalComponent ],
      imports: [ MatDialogModule ],
      providers: [
        {provide: MatDialogRef, useValue: matDialogRefMock}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog with "Cancelar" option selected', fakeAsync(() => {

    component.cancel();

    tick();

    expect(matDialogRefMock.close).toHaveBeenCalledWith('Cancelar');
  }));

  it('should close the dialog with "Cerrar Sesión" option selected', fakeAsync(() => {

    component.confirmLogout();

    tick();

    expect(matDialogRefMock.close).toHaveBeenCalledWith('Cerrar Sesión');
  }));
});
