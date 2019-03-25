import { Injectable } from '@angular/core';
import { Tablero } from '../models/tablero';
import { Restangular } from 'ngx-restangular';
import { Observable } from 'rxjs';
import { Sumador } from 'src/app/models/sumador';

@Injectable({
  providedIn: 'root'
})
export class TableroService {

  constructor(
    private restangular: Restangular) { }

  getTablero(id: number): Observable<Tablero> {
    return this.restangular.all(`/partidos`).get(id);
  }

  sumarPuntos(sumador: Sumador): Observable<Tablero> {
    return this.restangular.all('/sumador-de-puntos').post(sumador);
  }

}
