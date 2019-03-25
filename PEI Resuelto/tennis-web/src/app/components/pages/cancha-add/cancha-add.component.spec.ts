import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanchaAddComponent } from './cancha-add.component';

describe('CanchaAddComponent', () => {
  let component: CanchaAddComponent;
  let fixture: ComponentFixture<CanchaAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanchaAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanchaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
