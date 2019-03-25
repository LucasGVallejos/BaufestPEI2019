import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartidoAddComponent } from './partido-add.component';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Jugador } from 'src/app/models/jugador';
import { Partido } from 'src/app/models/partido';
import { JugadorService } from 'src/app/services/jugador.service';
import { PartidoService } from 'src/app/services/partido.service';
import { Estados } from 'src/app/models/estados';
import { Input, Component } from '@angular/core';

@Component({selector: 'app-partido-form', template: ''})
class AppPartidoFormStub {
  @Input()
  model: any;
  @Input()
  mensajeError: string;
  @Input()
  onCancel: any;
  @Input()
  onSubmit: any;
}

const jugador1 = {id: 1, nombre: 'Pedro1', puntos: 1} as Jugador;
const jugador2 = {id: 2, nombre: 'Pedro2', puntos: 2} as Jugador;
const jugador3 = {id: 3, nombre: 'Pedro3', puntos: 3} as Jugador;
const jugadores = [jugador1, jugador2, jugador3];

class PartidoServiceSpy {
  addPartido = jasmine.createSpy('addPartido').and.callFake(() => of({} as Partido));
}

class RouterSpy {
  navigate = jasmine.createSpy('navigate');
}

describe('PartidoAddComponent', () => {
  let component: PartidoAddComponent;
  let fixture: ComponentFixture<PartidoAddComponent>;
  let partidoServiceSpy: PartidoServiceSpy;
  let routerSpy: RouterSpy;
  const activatedRoute: any  = {
    params: of({ id: '1' })
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PartidoAddComponent,
        AppPartidoFormStub
      ],
      imports: [ FormsModule ]
    })
    .overrideComponent(PartidoAddComponent, {
      set: {
        providers: [
          { provide: PartidoService, useClass: PartidoServiceSpy},
          { provide: Router, useClass: RouterSpy},
          { provide: ActivatedRoute, useValue: activatedRoute}
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartidoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    routerSpy = fixture.debugElement.injector.get(Router) as any;
    partidoServiceSpy = fixture.debugElement.injector.get(PartidoService) as any;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy('Ocurrió un error al intentar crear el componente');
  });

  it('cancelar should cause navigation', () => {
    fixture.detectChanges();

    component.cancelar();

    expect(routerSpy.navigate).toHaveBeenCalledTimes(1);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/partidos']);
  });

  it('addPartido should add a match', () => {
    fixture.detectChanges();

    const partidazo = {
      id: 1,
      fechaComienzo: new Date(2019, 3, 21, 9, 0, 0, 0),
      estado: Estados.EnCurso,
      jugadorLocal: jugador1,
      jugadorVisitante: jugador2,
    } as Partido;
    component.model = partidazo;
    component.addPartido();

    expect(partidoServiceSpy.addPartido).toHaveBeenCalledTimes(1);
    expect(partidoServiceSpy.addPartido).toHaveBeenCalledWith(partidazo);
    expect(routerSpy.navigate).toHaveBeenCalledTimes(1);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/partidos']);
    expect(component.mensajeError).toBeFalsy();
  });

  it('addPartido should handle error', () => {
    partidoServiceSpy.addPartido = jasmine.createSpy('addPartido')
    .and.callFake(() => throwError({message: 'No se permiten partidazos los jueves'}));

    fixture.detectChanges();

    const partidazo = {
      id: 1,
      fechaComienzo: new Date(2019, 3, 21, 9, 0, 0, 0),
      estado: Estados.EnCurso,
      jugadorLocal: jugador1,
      jugadorVisitante: jugador2,
    } as Partido;
    component.model = partidazo;
    component.addPartido();

    expect(partidoServiceSpy.addPartido).toHaveBeenCalledTimes(1);
    expect(partidoServiceSpy.addPartido).toHaveBeenCalledWith(partidazo);
    expect(routerSpy.navigate).not.toHaveBeenCalled();
    expect(component.mensajeError).toBe('No se permiten partidazos los jueves');
  });
});
