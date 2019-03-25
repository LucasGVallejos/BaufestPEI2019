import { Partido } from './partido';

export class Cancha {
    public id: number;
    public nombre: string;
    public direccion: string;
    public partidos: Partido[];
    public partidosEnElDia: number;
  }
  