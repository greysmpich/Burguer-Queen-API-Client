import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOrderNotReadyComponent } from './modal-order-not-ready.component';

describe('ModalOrderNotReadyComponent', () => {
  let component: ModalOrderNotReadyComponent;
  let fixture: ComponentFixture<ModalOrderNotReadyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalOrderNotReadyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOrderNotReadyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
