import { ModosJugador } from 'src/app/models/modo-jugador';

export class Sumador {
  constructor(partidoId: number, modoJugador: ModosJugador) {
    this.partidoId = partidoId;
    this.modoJugador = modoJugador;
  }

  partidoId: number;
  modoJugador: ModosJugador
}
