import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartidoEditComponent } from './partido-edit.component';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Component, Input } from '@angular/core';
import { Jugador } from 'src/app/models/jugador';
import { Partido } from 'src/app/models/partido';
import { Estados } from 'src/app/models/estados';
import { JugadorService } from 'src/app/services/jugador.service';
import { PartidoService } from 'src/app/services/partido.service';

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
  @Input()
  isEdit: any;
}


const jugador1 = {id: 1, nombre: 'Pedro1', puntos: 1} as Jugador;
const jugador2 = {id: 2, nombre: 'Pedro2', puntos: 2} as Jugador;
const jugador3 = {id: 3, nombre: 'Pedro3', puntos: 3} as Jugador;

const jugadorLocal = {id: 1, nombre: 'Mirtha', puntos: 1} as Jugador;
const jugadorVisitante = {id: 7, nombre: 'Dios', puntos: 7} as Jugador;

const partido = {
  id: 1,
  fechaComienzo: new Date(0, 0, 0, 0, 0, 0, 0),
  jugadorLocal: jugadorLocal,
  jugadorVisitante: jugadorVisitante,
  estado: Estados.EnCurso
} as Partido;

class PartidoServiceSpy {
  editPartido = jasmine.createSpy('editPartido')
  .and.callFake(() => of(partido));
  getPartido = jasmine.createSpy('getPartido').and.callFake(() => of(partido));
}

class RouterSpy {
  navigate = jasmine.createSpy('navigate');
}

describe('PartidoEditComponent', () => {
  let component: PartidoEditComponent;
  let fixture: ComponentFixture<PartidoEditComponent>;
  let partidoServiceSpy: PartidoServiceSpy;
  let routerSpy: RouterSpy;
  const activatedRoute: any  = {
    params: of({ id: '1' })
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PartidoEditComponent,
        AppPartidoFormStub
      ],
      imports: [ FormsModule ]
    })
    .overrideComponent(PartidoEditComponent, {
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
    fixture = TestBed.createComponent(PartidoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    routerSpy = fixture.debugElement.injector.get(Router) as any;
    partidoServiceSpy = fixture.debugElement.injector.get(PartidoService) as any;
  });

  it('should create', () => {
    expect(component).toBeTruthy('Ocurrió un error al intentar crear el componente');
  });

  it('should assign a match', () => {
    fixture.detectChanges();

    expect(component.model).toBeTruthy(partido);

    expect(partidoServiceSpy.getPartido).toHaveBeenCalledTimes(1);
    expect(partidoServiceSpy.getPartido).toHaveBeenCalledWith('1');
  });

  it('cancelar should cause navigation', () => {
    fixture.detectChanges();

    component.cancelar();

    expect(routerSpy.navigate).toHaveBeenCalledTimes(1);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/partidos']);
  });

  it('editPartido should edit a match', () => {
    fixture.detectChanges();

    const partidazo = {
      id: 1,
      fechaComienzo: new Date(2019, 3, 21, 9, 0, 0, 0),
      estado: Estados.EnCurso,
      jugadorLocal: jugador1,
      jugadorVisitante: jugador2
    } as Partido;
    component.model = partidazo;
    component.editPartido();

    expect(partidoServiceSpy.editPartido).toHaveBeenCalledTimes(1);
    expect(partidoServiceSpy.editPartido).toHaveBeenCalledWith(partidazo);
    expect(routerSpy.navigate).toHaveBeenCalledTimes(1);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/partidos']);
    expect(component.mensajeError).toBeFalsy();
  });

  it('editPartido should handle error', () => {
    partidoServiceSpy.editPartido = jasmine.createSpy('editPartido')
    .and.returnValue(throwError({message: 'No se permite editar partidazos los jueves'}));

    fixture.detectChanges();

    const partidazo = {
      id: 1,
      fechaComienzo: new Date(2019, 3, 21, 9, 0, 0, 0),
      estado: Estados.EnCurso,
      jugadorLocal: jugador1,
      jugadorVisitante: jugador2
    } as Partido;
    component.model = partidazo;
    component.editPartido();

    expect(partidoServiceSpy.editPartido).toHaveBeenCalledTimes(1);
    expect(partidoServiceSpy.editPartido).toHaveBeenCalledWith(partidazo);
    expect(routerSpy.navigate).not.toHaveBeenCalled();
    expect(component.mensajeError).toBe('No se permite editar partidazos los jueves');
  });
});
