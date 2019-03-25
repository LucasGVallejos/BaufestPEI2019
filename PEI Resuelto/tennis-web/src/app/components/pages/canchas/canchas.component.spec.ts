import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanchasComponent } from './canchas.component';

describe('CanchasComponent', () => {
  let component: CanchasComponent;
  let fixture: ComponentFixture<CanchasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanchasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanchasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
