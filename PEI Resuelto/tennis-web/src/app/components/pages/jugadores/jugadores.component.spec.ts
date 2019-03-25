import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JugadoresComponent } from './jugadores.component';
import { Jugador } from 'src/app/models/jugador';
import { JugadorService } from 'src/app/services/jugador.service';
import { RouterLinkStubDirective, RouterLink } from 'src/app/testing/router-stub';
import { of } from 'rxjs';
import { RouterModule } from '@angular/router';

const jugador1 = {id: 1, nombre: 'Juan1', puntos: 1} as Jugador;
const jugador2 = {id: 2, nombre: 'Juan2', puntos: 2} as Jugador;
const jugador3 = {id: 3, nombre: 'Juan3', puntos: 3} as Jugador;
const jugadores = [jugador1, jugador2, jugador3];
class JugadorServiceSpy {
  listJugadores = jasmine.createSpy('listJugadores').and.callFake(() => of(jugadores));
}

describe('JugadoresComponent', () => {
  let component: JugadoresComponent;
  let fixture: ComponentFixture<JugadoresComponent>;
  let jugadorServiceSpy: JugadorServiceSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        JugadoresComponent
      ],
      imports: [ RouterModule.forRoot([]) ]
    })
    .overrideComponent(JugadoresComponent, {
      set: {
        providers: [
          { provide: JugadorService, useClass: JugadorServiceSpy}
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JugadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    jugadorServiceSpy = fixture.debugElement.injector.get(JugadorService) as any;
  });

  it('should create', () => {
    expect(component).toBeTruthy('Ocurrió un error al intentar crear el componente');
  });

  it('should assing the list of players', () => {
    expect(component.jugadores).toBe(jugadores);
    expect(jugadorServiceSpy.listJugadores).toHaveBeenCalledTimes(1);
  });
});
