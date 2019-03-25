import { Injectable } from '@angular/core';
import { Partido } from '../models/partido';
import { Respuesta } from '../models/respuesta';
import { Restangular } from 'ngx-restangular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class PartidoService {

  constructor(
    private restangular: Restangular) {
  }

  listPartidos(): Observable<Partido[]> {
    return this.restangular.all(`/partidos`).getList();
  }

  addPartido(partido: Partido): Observable<Partido> {
    return Observable.create(observer => {
      this.validatePartido(partido).subscribe(
        (resp) => this.restangular.all('/partidos').post(partido).subscribe(observer),
        (error) => observer.error(error));
    });
  }

  editPartido(partido: Partido): Observable<Partido> {
    return Observable.create(observer => {
      this.validatePartido(partido).subscribe(
        (resp) => this.restangular.all(`/partidos/${partido.id}`).customPUT(partido).subscribe(observer),
        (error) => observer.error(error));
    });
  }

  removePartido(id: number): Observable<any> {
    return this.restangular.all(`/partidos/${id}`).remove();
  }

  getPartido(id: number): Observable<any> {
    return this.restangular.all(`/partidos`).get(id).pipe(map(
      (partido: Partido) => _.extend(new Partido, partido, { fechaComienzo: new Date(partido.fechaComienzo) })));
  }

  iniciarPartido(id: number): Observable<any> {
    return this.restangular.all(`/partidos/${id}/actions/init`).customPUT();
  }

  private validatePartido(partido: Partido): Observable<Respuesta> {
    return Observable.create(observer => {

      // tslint:disable-next-line:triple-equals
      if (partido.jugadorLocal.id == partido.jugadorVisitante.id) {
        return observer.error(new Respuesta(true, 'Los jugadores local y visitante no pueden ser iguales'));
      }

      const date = new Date(partido.fechaComienzo);

      if (!(date instanceof Date) || isNaN(date.getTime())) {
        return observer.error(new Respuesta(true, 'El formato de la fecha/hora de inicio no es válido'));
      }

      if (date < new Date(Date.now())) {
        return observer.error(new Respuesta(true, 'La fecha/hora de inicio debe ser mayor o igual a la fecha/hora actual'));
      }

      this.validateCancha(partido).subscribe(
        () => observer.next(),
        (error) => observer.error(error))

      //return observer.next(new Respuesta(false));
    });
  }

  private validateCancha(partido: Partido): Observable<Respuesta> {
    return Observable.create(observer => {
      this.restangular.all(`/partidos`).getList().subscribe((partidos: Partido[]) => {

        // Define una constante para el intervalo horario de un partido para utilizar la misma cancha de otro
        const INDICE_DIFERENCIA_HORAS: number = 4;

        let canchaId: number = partido.cancha.id;
        let fechaComienzo = partido.fechaComienzo;

        // Le quita 4 horas a la fecha actual
        let fechaHorasAntes: Date = new Date(new Date(partido.fechaComienzo).setHours(
          new Date(fechaComienzo).getHours() - INDICE_DIFERENCIA_HORAS));

        // Agrega 4 horas a la fecha actual
        let fechaHorasDespues: Date = new Date(new Date(partido.fechaComienzo).setHours(
          new Date(fechaComienzo).getHours() + INDICE_DIFERENCIA_HORAS));

        // Filtra por los partidos de esa cancha
        let partidosParaCancha = partidos.filter(m => m.cancha.id == canchaId);

        // Si es edición no contempla el partido actual
        if (partido.id)
          partidosParaCancha = partidosParaCancha.filter(m => m.id != partido.id);

        // Busca todos los partidos que comiencen en un intervalo de 4 horas antes y 4 horas despues
        let partidosEntreHorarios = partidosParaCancha
          .filter(x =>
            new Date(x.fechaComienzo) > fechaHorasAntes &&
            new Date(x.fechaComienzo) < fechaHorasDespues
          );

        if (partidosEntreHorarios.length > 0)
          return observer.error(new Respuesta(true, 'El partido no puede utilizar la misma cancha de otro partido en un intervalo de 4 horas'));

        return observer.next();
      });
    });
  }
}
