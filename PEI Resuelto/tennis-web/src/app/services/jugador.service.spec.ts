import { JugadorService } from './jugador.service';
import { RestangularStub } from '../testing/restangular-stub.spec';
import { Restangular } from 'ngx-restangular';
import { Jugador } from '../models/jugador';
import { of } from 'rxjs';

let restangularStub: RestangularStub;
let service: JugadorService;

describe('JugadorService', () => {
  beforeEach(() => {
    restangularStub = new RestangularStub();
    service = new JugadorService(restangularStub as Restangular);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('listJugadores should GET a list of players', () => {
    const jugadores = [{} as Jugador];
    restangularStub.getList.and.callFake(() => of(jugadores));
    const observableJugadores = service.listJugadores();

    observableJugadores.subscribe((data) => {
      expect(data).toBe(jugadores);
    });

    expect(restangularStub.getList).toHaveBeenCalledTimes(1);
    expect(restangularStub.all).toHaveBeenCalledTimes(1);
    expect(restangularStub.all).toHaveBeenCalledWith(`/jugadores`);
  });

  it('addJugador should POST a player', () => {
    const jugador = {} as Jugador;
    restangularStub.post.and.callFake(() => of(jugador));
    const observableJugador = service.addJugador(jugador);

    observableJugador.subscribe((data) => {
      expect(data).toBe(jugador);
    });

    expect(restangularStub.post).toHaveBeenCalledTimes(1);
    expect(restangularStub.all).toHaveBeenCalledTimes(1);
    expect(restangularStub.post).toHaveBeenCalledWith(jugador);
    expect(restangularStub.all).toHaveBeenCalledWith(`/jugadores`);
  });

  it('editJugador should PUT a player', () => {
    const jugador = {id: 1} as Jugador;
    restangularStub.customPUT.and.callFake(() => of(jugador));
    const observableJugador = service.editJugador(jugador);

    observableJugador.subscribe((data) => {
      expect(data).toBe(jugador);
    });

    expect(restangularStub.customPUT).toHaveBeenCalledTimes(1);
    expect(restangularStub.all).toHaveBeenCalledTimes(1);
    expect(restangularStub.customPUT).toHaveBeenCalledWith(jugador);
    expect(restangularStub.all).toHaveBeenCalledWith(`/jugadores/1`);
  });

  it('removeJugador should DELETE a player', () => {
    restangularStub.remove.and.callFake(() => of({Mensaje: 'Removido ok'}));
    const observableJugador = service.removeJugador(1);

    observableJugador.subscribe((data) => {
      expect(data.Mensaje).toBe('Removido ok');
    });

    expect(restangularStub.remove).toHaveBeenCalledTimes(1);
    expect(restangularStub.all).toHaveBeenCalledTimes(1);
    expect(restangularStub.all).toHaveBeenCalledWith(`/jugadores/1`);
  });
});
