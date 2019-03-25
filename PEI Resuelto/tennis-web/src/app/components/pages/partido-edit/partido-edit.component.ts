import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Partido } from '../../../models/partido';
import { Jugador } from '../../../models/jugador';
import { PartidoService } from '../../../services/partido.service';
import { JugadorService } from '../../../services/jugador.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Cancha } from 'src/app/models/cancha';
import { DatePipe } from '@angular/common';
import * as _ from 'lodash';

@Component({
  selector: 'app-partido-edit',
  templateUrl: './partido-edit.component.html',
  styleUrls: ['./partido-edit.component.css']
})
export class PartidoEditComponent implements OnInit {

  model: Partido;
  jugadores: Jugador[];
  mensajeError: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private partidoService: PartidoService) {
    // Inicializa el objeto por primera vez para almacenar los datos
    this.model = new Partido;
    this.model.jugadorLocal = new Jugador;
    this.model.jugadorVisitante = new Jugador;
    this.model.cancha = new Cancha;
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(p => {
      if (!p['id']) throw new Error('Falta el parametro id');

      this.partidoService.getPartido(p['id']).subscribe((partido: Partido) => {

        // Arregla el formato de la propiedad para que se vea bien en el textbox
        this.model = _.extend(partido, { fechaComienzo: this.formatDate(partido.fechaComienzo, 'yyyy/MM/dd HH:mm') })
      });
    });
  }

  editPartido() {
    // Arregla el modelo para que tenga la propiedad como un objeto Date
    let modelFixed = _.extend({}, this.model, { fechaComienzo: new Date(this.model.fechaComienzo) });

    this.partidoService.editPartido(modelFixed).subscribe(
      data => this.router.navigate(['/partidos']),
      error => this.mensajeError = error.message);
  }

  cancelar() {
    this.router.navigate(['/partidos']);
  }

  private formatDate(date: Date, format: string) {
    // Formatea la fecha
    return new DatePipe('en-EU').transform(date, format);
  }

}
