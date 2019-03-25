import { Injectable } from '@angular/core';
import { Jugador } from '../models/jugador';
import { Respuesta } from '../models/respuesta';
import { Restangular } from 'ngx-restangular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JugadorService {

  constructor(
    private restangular: Restangular) {
  }

  listJugadores(): Observable<Jugador[]> {
    return this.restangular.all(`/jugadores`).getList();
  }

  addJugador(jugador: Jugador): Observable<Jugador> {
    return this.restangular.all('/jugadores').post(jugador);
  }

  editJugador(jugador: Jugador): Observable<any> {
    return this.restangular.all(`/jugadores/${jugador.id}`).customPUT(jugador);
  }

  removeJugador(id: number): Observable<any> {
    return this.restangular.all(`/jugadores/${id}`).remove();
  }

  recalcularRanking(id: number): Observable<any> {
    return this.restangular.all(`/jugadores/${id}/actions/recalculateRanking`).customPUT();
  }

  getJugador(id: number): Observable<Jugador> {
    return this.restangular.all(`/jugadores`).get(id);
  }
}
