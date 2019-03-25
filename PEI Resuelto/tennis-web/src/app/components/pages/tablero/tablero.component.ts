import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Estados } from '../../../models/estados';
import { ModosJugador } from 'src/app/models/modo-jugador';
import { Tablero } from '../../../models/tablero';
import { Partido } from 'src/app/models/partido';
import { TableroService } from '../../../services/tablero.service';
import { PartidoService } from 'src/app/services/partido.service';
import { Sumador } from 'src/app/models/sumador';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {

  tablero: Tablero;
  estados = Estados;
  modoJugador = ModosJugador;
  mensajeError: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tableroService: TableroService,
    private partidoService: PartidoService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(p => {
      if (!p['id']) throw new Error('Falta el parametro id');

      this.getTablero(p['id']);
    });
  }

  private getTablero(id: number) {
    this.tableroService.getTablero(id).subscribe(
      (tablero: Tablero) => this.tablero = tablero,
      (error: any) => this.mensajeError = error.message);
  }

  sumarPuntos(modoJugador: ModosJugador) {
    this.tableroService.sumarPuntos(new Sumador(this.tablero.id, modoJugador)).subscribe(
      (tablero: Tablero) => this.tablero = tablero,
      (error: any) => this.mensajeError = error.message);
  }

}
