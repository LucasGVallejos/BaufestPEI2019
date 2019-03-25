import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JugadorEditComponent } from './jugador-edit.component';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, Input } from '@angular/core';
import { Jugador } from 'src/app/models/jugador';
import { JugadorService } from 'src/app/services/jugador.service';


@Component({selector: 'app-jugador-form', template: ''})
class AppJugadorFormStub {
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

const jugadorEditable = {id: 1, nombre: 'Juan', puntos: 10} as Jugador;

class JugadorServiceSpy {
  editJugador = jasmine.createSpy('editJugador').and.callFake(() => of(jugadorEditable));
  getJugador = jasmine.createSpy('getJugador').and.callFake(() => of(jugadorEditable));
}

class RouterSpy {
  navigate = jasmine.createSpy('navigate');
}

describe('JugadorEditComponent', () => {
  let component: JugadorEditComponent;
  let fixture: ComponentFixture<JugadorEditComponent>;
  let jugadorServiceSpy: JugadorServiceSpy;
  let routerSpy: RouterSpy;
  const activatedRoute: any  = {
    params: of({ id: '1' })
  };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        JugadorEditComponent,
        AppJugadorFormStub
      ],
      imports: [ FormsModule ]
    })
    .overrideComponent(JugadorEditComponent, {
      set: {
        providers: [
          { provide: JugadorService, useClass: JugadorServiceSpy},
          { provide: Router, useClass: RouterSpy },
          { provide: ActivatedRoute, useValue: activatedRoute }
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JugadorEditComponent);
    component = fixture.componentInstance;

    routerSpy = fixture.debugElement.injector.get(Router) as any;
    jugadorServiceSpy = fixture.debugElement.injector.get(JugadorService) as any;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy('Ocurrió un error al intentar crear el componente');
  });

  it('should assign a player', () => {
    fixture.detectChanges();

    expect(component.model).toBe(jugadorEditable);
    expect(jugadorServiceSpy.getJugador).toHaveBeenCalledTimes(1);
    expect(jugadorServiceSpy.getJugador).toHaveBeenCalledWith('1');
  });

  it('cancelar should cause navigation', () => {
    fixture.detectChanges();

    component.cancelar();

    expect(routerSpy.navigate).toHaveBeenCalledTimes(1);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/jugadores'], {relativeTo: activatedRoute});
  });

  it('editJugador should edit a player', () => {
    fixture.detectChanges();

    const pepe = {id: 1, nombre: 'Pepe', puntos: 1} as Jugador;
    component.model = pepe;
    component.editJugador();

    expect(jugadorServiceSpy.editJugador).toHaveBeenCalledTimes(1);
    expect(jugadorServiceSpy.editJugador).toHaveBeenCalledWith(pepe);
    expect(routerSpy.navigate).toHaveBeenCalledTimes(1);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/jugadores'], {relativeTo: activatedRoute});
    expect(component.mensajeError).toBeFalsy();
  });

  it('editJugador should handle error', () => {
    jugadorServiceSpy.editJugador = jasmine.createSpy('editJugador')
    .and.callFake(() => throwError({message: 'No se permite editar "pepes"... bueno, a veces'}));

    fixture.detectChanges();

    const pepe = {id: 1, nombre: 'Pepe', puntos: 1} as Jugador;
    component.model = pepe;
    component.editJugador();

    expect(jugadorServiceSpy.editJugador).toHaveBeenCalledTimes(1);
    expect(jugadorServiceSpy.editJugador).toHaveBeenCalledWith(pepe);
    expect(routerSpy.navigate).not.toHaveBeenCalled();
    expect(component.mensajeError).toBe('No se permite editar "pepes"... bueno, a veces');
  });
});
