import { Component, OnInit } from '@angular/core';
import { Jugador } from '../../../models/jugador';
import { JugadorService } from '../../../services/jugador.service';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css']
})
export class JugadoresComponent implements OnInit {
  jugadores: Array<Jugador>;

  constructor(private jugadorService: JugadorService) {
  }

  ngOnInit() {
    this.loadJugadores();
  }

  loadJugadores() {
    this.jugadorService.listJugadores()
      .subscribe((jugadores: Jugador[]) => { this.jugadores = jugadores; });
  }

  removeJugador(id: number) {
    if (!confirm('¿Estás seguro?')) {
      return;
    }

    this.jugadorService.removeJugador(id).subscribe((data) => this.loadJugadores());
  }

  recalcularRanking(id: number) {
    this.jugadorService.recalcularRanking(id).subscribe((data) => this.loadJugadores());
  }

}
