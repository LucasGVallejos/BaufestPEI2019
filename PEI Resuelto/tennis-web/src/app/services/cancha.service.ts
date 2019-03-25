import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { Observable } from 'rxjs';
import { Cancha } from '../models/cancha';

@Injectable({
  providedIn: 'root'
})
export class CanchaService {
  
  constructor(
    private restangular: Restangular) {
  }

  listCanchas(): Observable<Cancha[]> {
    return this.restangular.all(`/canchas`).getList();
  }

  addCancha(cancha: Cancha): Observable<Cancha> {
    return this.restangular.all('/canchas').post(cancha);
  }

  editCancha(cancha: Cancha): Observable<any> {
    return this.restangular.all(`/canchas/${cancha.id}`).customPUT(cancha);
  }

  removeCancha(id: number): Observable<any> {
    return this.restangular.all(`/canchas/${id}`).remove();
  }

  getCancha(id: number): Observable<Cancha> {
    return this.restangular.all(`/canchas`).get(id);
  }
}
