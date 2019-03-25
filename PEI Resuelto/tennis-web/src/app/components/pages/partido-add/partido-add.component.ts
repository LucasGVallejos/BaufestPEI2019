import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Partido } from '../../../models/partido';
import { Jugador } from '../../../models/jugador';
import { PartidoService } from '../../../services/partido.service';
import { JugadorService } from '../../../services/jugador.service';
import { Estados } from 'src/app/models/estados';
import { Cancha } from 'src/app/models/cancha';
import * as _ from 'lodash';

@Component({
  selector: 'app-partido-add',
  templateUrl: './partido-add.component.html',
  styleUrls: ['./partido-add.component.css']
})
export class PartidoAddComponent implements OnInit {

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

  addPartido() {
    // Arregla el modelo para que tenga la propiedad como un objeto Date
    const modelFixed = _.extend({}, this.model, { fechaComienzo: new Date(this.model.fechaComienzo) });

    this.partidoService.addPartido(modelFixed).subscribe(
      data => this.router.navigate(['/partidos']),
      error => this.mensajeError = error.message);
  }

  cancelar() {
    this.router.navigate(['/partidos']);
  }

  ngOnInit() {
  }

}
