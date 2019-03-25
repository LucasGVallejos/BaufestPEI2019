import { Jugador } from './jugador';
import { Estados } from './estados';
import { Cancha } from './cancha';

export class Partido {
  public id: number;
  public fechaComienzo: Date;

  public estado: Estados;

  public jugadorLocal: Jugador;
  public jugadorVisitante: Jugador;
  public scoreLocal?: number;
  public puntosGameActualLocal?: string;
  public cantidadGamesLocal?: number;

  public scoreVisitante?: number;
  public puntosGameActualVisitante?: string;
  public cantidadGamesVisitante?: number;

  public cancha: Cancha;
}
