import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CanchaFormComponent } from 'src/app/components/partials/cancha-form/cancha-form.component';


describe('CanchaFormComponent', () => {
  let component: CanchaFormComponent;
  let fixture: ComponentFixture<CanchaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanchaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanchaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
