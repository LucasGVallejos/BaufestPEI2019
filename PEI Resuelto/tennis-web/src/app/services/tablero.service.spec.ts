import { TableroService } from './tablero.service';
import { RestangularStub } from '../testing/restangular-stub.spec';
import { Restangular } from 'ngx-restangular';
import { Tablero } from '../models/tablero';
import { Sumador } from '../models/sumador';
import { of } from 'rxjs/internal/observable/of';

let restangularStub: RestangularStub;
let service: TableroService;

describe('TableroService', () => {
  beforeEach(() => {
  restangularStub = new RestangularStub();
  service = new TableroService(restangularStub as Restangular);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should GET board', () => {
    const tablero = {} as Tablero;
    restangularStub.get.and.callFake(() => of(tablero));
    const observableTablero = service.getTablero(1);

    observableTablero.subscribe((data) => {
      expect(data).toBe(tablero);
    });

    expect(restangularStub.get).toHaveBeenCalledTimes(1);
    expect(restangularStub.all).toHaveBeenCalledTimes(1);
    expect(restangularStub.get).toHaveBeenCalledWith(1);
    expect(restangularStub.all).toHaveBeenCalledWith(`/partidos`);
  });

  it('should POST points', () => {
    const sumador = {} as Sumador;
    const tablero = {} as Tablero;
    restangularStub.post.and.callFake(() => of(tablero));
    const observableTablero = service.sumarPuntos(sumador);

    observableTablero.subscribe((data) => {
      expect(data).toBe(tablero);
    });

    expect(restangularStub.post).toHaveBeenCalledTimes(1);
    expect(restangularStub.all).toHaveBeenCalledTimes(1);
    expect(restangularStub.post).toHaveBeenCalledWith(sumador);
    expect(restangularStub.all).toHaveBeenCalledWith('/sumador-de-puntos');
  });
});
