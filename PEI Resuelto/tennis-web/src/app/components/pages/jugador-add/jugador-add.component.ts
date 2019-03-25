import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Jugador } from '../../../models/jugador';
import { JugadorService } from '../../../services/jugador.service';

@Component({
  selector: 'app-jugador-add',
  templateUrl: './jugador-add.component.html',
  styleUrls: ['./jugador-add.component.css']
})
export class JugadorAddComponent implements OnInit {

  model: Jugador = new Jugador();
  mensajeError: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private jugadorService: JugadorService) {
  }

  addJugador() {
    this.jugadorService.addJugador(this.model).subscribe(
      data => this.router.navigate(['/jugadores'], { relativeTo: this.activatedRoute }),
      error => this.mensajeError = error.message);
  }

  cancelar() {
    this.router.navigate(['/jugadores'], { relativeTo: this.activatedRoute });
  }

  ngOnInit() {
  }

}
