import { TestBed } from '@angular/core/testing';

import { PartidoService } from './partido.service';
import { RestangularStub } from '../testing/restangular-stub.spec';
import { Restangular } from 'ngx-restangular';
import { Jugador } from '../models/jugador';
import { Partido } from '../models/partido';
import { of } from 'rxjs';

let restangularStub: RestangularStub;
let service: PartidoService;

describe('PartidoService', () => {
  beforeEach(() => {
    restangularStub = new RestangularStub();
    service = new PartidoService(restangularStub as Restangular);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

    it('listPartidos should GET a list of matches', () => {
      const partidos = [{} as Partido];
      restangularStub.getList.and.callFake(() => of(partidos));
      const observableJugadores = service.listPartidos();

      observableJugadores.subscribe((data) => {
        expect(data).toBe(partidos);
      });

      expect(restangularStub.getList).toHaveBeenCalledTimes(1);
      expect(restangularStub.all).toHaveBeenCalledTimes(1);
      expect(restangularStub.all).toHaveBeenCalledWith(`/partidos`);
    });

    xit('addPartido should POST a match', () => {
      const jugadorLocal = {id: 1} as Jugador;
      const jugadorVisitante = {id: 2} as Jugador;
      const partido = {
        jugadorLocal: jugadorLocal,
        jugadorVisitante: jugadorVisitante,
        fechaComienzo: new Date()
      } as Partido;
      restangularStub.post.and.callFake(() => of(partido));
      const observableJugador = service.addPartido(partido);

      observableJugador.subscribe((data) => {
        expect(data).toBe(partido);
      });

      expect(restangularStub.post).toHaveBeenCalledTimes(1);
      expect(restangularStub.all).toHaveBeenCalledTimes(1);
      expect(restangularStub.post).toHaveBeenCalledWith(partido);
      expect(restangularStub.all).toHaveBeenCalledWith(`/partidos`);
    });

    xit('editPartido should PUT a match', () => {
      const jugadorLocal = {id: 1} as Jugador;
      const jugadorVisitante = {id: 2} as Jugador;
      const partido = {
        jugadorLocal: jugadorLocal,
        jugadorVisitante: jugadorVisitante,
        fechaComienzo: new Date()
      } as Partido;
      restangularStub.customPUT.and.callFake(() => of(partido));
      const observableJugador = service.editPartido(partido);

      observableJugador.subscribe((data) => {
        expect(data).toBe(partido);
      });

      expect(restangularStub.customPUT).toHaveBeenCalledTimes(1);
      expect(restangularStub.all).toHaveBeenCalledTimes(1);
      expect(restangularStub.customPUT).toHaveBeenCalledWith(partido);
      expect(restangularStub.all).toHaveBeenCalledWith(`/partidos/1`);
    });

    xit('removePartido should DELETE a match', () => {
      restangularStub.remove.and.callFake(() => of({Mensaje: 'Removido ok'}));
      const observableJugador = service.removePartido(1);

      observableJugador.subscribe((data) => {
        expect(data.Mensaje).toBe('Removido ok');
      });

      expect(restangularStub.remove).toHaveBeenCalledTimes(1);
      expect(restangularStub.all).toHaveBeenCalledTimes(1);
      expect(restangularStub.all).toHaveBeenCalledWith(`/partidos/1`);
    });
});
