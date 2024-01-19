import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientNameInputComponent } from './client-name-input.component';

describe('ClientNameInputComponent', () => {
  let component: ClientNameInputComponent;
  let fixture: ComponentFixture<ClientNameInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientNameInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientNameInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
