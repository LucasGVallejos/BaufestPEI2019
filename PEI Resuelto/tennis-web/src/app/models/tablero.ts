import { Jugador } from './jugador';
import { Estados } from './estados';

export class Tablero {
  public id: number;
  public estado: Estados;

  public jugadorLocal: Jugador;
  public scoreLocal?: number;
  public puntosGameActualLocal: string;
  public cantidadGamesLocal: number;

  public jugadorVisitante: Jugador;
  public scoreVisitante?: number;
  public puntosGameActualVisitante: string;
  public cantidadGamesVisitante: number;
}
