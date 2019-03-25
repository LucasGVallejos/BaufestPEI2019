import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JugadorAddComponent } from './jugador-add.component';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { JugadorService } from '../../../services/jugador.service';
import { Jugador } from '../../../models/jugador';
import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { JugadorFormComponent } from '../../partials/jugador-form/jugador-form.component';

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
}

class JugadorServiceSpy {
  addJugador = jasmine.createSpy('addJugador').and.callFake(() => of({} as Jugador));
}

class RouterSpy {
  navigate = jasmine.createSpy('navigate');
}

describe('JugadorAddComponent', () => {
  let component: JugadorAddComponent;
  let fixture: ComponentFixture<JugadorAddComponent>;
  let jugadorServiceSpy: JugadorServiceSpy;
  let routerSpy: RouterSpy;
  const activatedRoute: any  = {
    params: of({ id: '1' })
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        JugadorAddComponent,
        AppJugadorFormStub
      ],
      imports: [ FormsModule ]
    })
    .overrideComponent(JugadorAddComponent, {
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
    fixture = TestBed.createComponent(JugadorAddComponent);
    component = fixture.componentInstance;

    routerSpy = fixture.debugElement.injector.get(Router) as any;
    jugadorServiceSpy = fixture.debugElement.injector.get(JugadorService) as any;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy('Ocurrió un error al intentar crear el componente');
  });

  it('cancelar should cause navigation', () => {
    fixture.detectChanges();

    component.cancelar();

    expect(routerSpy.navigate).toHaveBeenCalledTimes(1);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/jugadores'], {relativeTo: activatedRoute});
  });

  it('addJugador should add a player', () => {
    fixture.detectChanges();

    const pepe = {id: 1, nombre: 'Pepe', puntos: 1} as Jugador;
    component.model = pepe;

    component.addJugador();

    expect(jugadorServiceSpy.addJugador).toHaveBeenCalledTimes(1);
    expect(jugadorServiceSpy.addJugador).toHaveBeenCalledWith(pepe);
    expect(routerSpy.navigate).toHaveBeenCalledTimes(1);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/jugadores'], {relativeTo: activatedRoute});
    expect(component.mensajeError).toBeFalsy();
  });

  it('addJugador should handle error', () => {
    jugadorServiceSpy.addJugador = jasmine.createSpy('addJugador').and.callFake(() =>
    throwError({message: 'No se permiten "pepes"... bueno, solo uno'}));

    fixture.detectChanges();

    const pepe = {id: 1, nombre: 'Pepe', puntos: 1} as Jugador;
    component.model = pepe;
    
    component.addJugador();

    expect(jugadorServiceSpy.addJugador).toHaveBeenCalledTimes(1);
    expect(jugadorServiceSpy.addJugador).toHaveBeenCalledWith(pepe);
    expect(routerSpy.navigate).not.toHaveBeenCalled();
    expect(component.mensajeError).toBe('No se permiten "pepes"... bueno, solo uno');
  });
});
