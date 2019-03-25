import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanchaEditComponent } from './cancha-edit.component';

describe('CanchaEditComponent', () => {
  let component: CanchaEditComponent;
  let fixture: ComponentFixture<CanchaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanchaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanchaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
