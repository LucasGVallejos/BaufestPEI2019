import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PartidoAddComponent } from '../../pages/partido-add/partido-add.component';


describe('PartidoAddComponent', () => {
  let component: PartidoAddComponent;
  let fixture: ComponentFixture<PartidoAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartidoAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartidoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
