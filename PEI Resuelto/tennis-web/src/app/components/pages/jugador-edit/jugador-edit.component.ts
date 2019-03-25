import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Jugador } from '../../../models/jugador';
import { JugadorService } from '../../../services/jugador.service';

@Component({
  selector: 'app-jugador-edit',
  templateUrl: './jugador-edit.component.html',
  styleUrls: ['./jugador-edit.component.css']
})
export class JugadorEditComponent implements OnInit {

  model: Jugador = new Jugador();
  mensajeError: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private jugadorService: JugadorService) {
  }

  editJugador() {
    this.jugadorService.editJugador(this.model).subscribe(
      data => this.router.navigate(['/jugadores'], { relativeTo: this.activatedRoute }),
      error => this.mensajeError = error.message);
  }

  cancelar() {
    this.router.navigate(['/jugadores'], { relativeTo: this.activatedRoute });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(p => {
      if (!p['id']) throw new Error('Falta el parametro id');

      this.jugadorService.getJugador(p['id']).subscribe(
        (jugador: Jugador) => this.model = jugador);
    });
  }

}
