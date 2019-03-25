import L from '../../common/logger'
import { Partido } from '../model/partido';
import { PartidorRepository } from '../repositories/partido.repository'
import { getCustomRepository } from "typeorm";
import {Estados, checkState} from '../dtos/estados.enum';
import ModosJugador from '../dtos/modos.jugador.enum';

export class PartidoService {

    save(partido: Partido): Promise<Partido> {
        partido.estado = Estados.NoIniciado;
        return getCustomRepository(PartidorRepository).save(partido);
    }

    update(id: number, partido: Partido): Promise<Partido> {  
        if(!checkState(partido.estado)){
            return Promise.reject(new Error('state is invalid!'));
        }      
        return getCustomRepository(PartidorRepository).update(id, partido);
    }

    remove(id: number): Promise<Partido> {
        return getCustomRepository(PartidorRepository).remove(id);
    }

    findOne(id: number): Promise<Partido> {
        return getCustomRepository(PartidorRepository).findOne(id);
    }

    getAll(): Promise<Array<Partido>> {
        return getCustomRepository(PartidorRepository).findAll();
    }

    initGame(id: number): Promise<Partido> {
        return getCustomRepository(PartidorRepository).findOne(id)
            .then(r => {
                if (!r) return;
                r.estado = Estados.EnCurso;
                return getCustomRepository(PartidorRepository).save(r);
            })
    }

    sumarPuntos(id: number, modo: ModosJugador): Promise<Partido> {
        return getCustomRepository(PartidorRepository).findOne(id)
            .then(partido => {
                if (!partido) return;

                if (modo === ModosJugador.Local) {
                    partido.scoreLocal += 1;
                } else {
                    partido.scoreVisitante += 1;
                }

                this.actualizarScore(partido);

                return this.update(id, partido).then(r => {
                    if (!r) return;

                    return r;
                });
            });
    }

    private actualizarScore(partido: Partido) {
        if (partido.scoreLocal < 4 && partido.scoreVisitante < 4) {
            partido.puntosGameActualLocal = this.translateScore(partido.scoreLocal);
            partido.puntosGameActualVisitante = this.translateScore(partido.scoreVisitante);

            return;
        }

        if (partido.scoreLocal >= 3 && partido.scoreVisitante >= 3 && Math.abs(partido.scoreLocal - partido.scoreVisitante) < 2) {
            if (partido.scoreLocal == partido.scoreVisitante) {
                partido.puntosGameActualLocal = "40";
                partido.puntosGameActualVisitante = "40";
            }
            else if (partido.scoreLocal > partido.scoreVisitante) {
                partido.puntosGameActualLocal = "Adv";
            }
            else {
                partido.puntosGameActualVisitante = "Adv";
            }

            return;
        }

        if (partido.scoreLocal > partido.scoreVisitante && partido.scoreLocal >= 4) {
            this.gameLocal(partido);
            return;
        }

        if (partido.scoreVisitante > partido.scoreLocal && partido.scoreVisitante >= 4) {
            this.gameVisitante(partido);
            return;
        }

    }

    private translateScore(points: number) {
        switch (points) {
            case 3:
                return "40";
            case 2:
                return "30";
            case 1:
                return "15";
            case 0:
                return "0";
            default:
                return "";
        }
    }

    private gameLocal(partido: Partido) {
        partido.scoreLocal = 0;
        partido.scoreVisitante = 0;
        partido.puntosGameActualLocal = this.translateScore(partido.scoreLocal);
        partido.puntosGameActualVisitante = this.translateScore(partido.scoreVisitante);

        partido.cantidadGamesLocal++;
        if (partido.cantidadGamesLocal == 6) {
            partido.estado = Estados.Finalizado;
        }
    }

    private gameVisitante(partido: Partido) {
        partido.scoreLocal = 0;
        partido.scoreVisitante = 0;
        partido.puntosGameActualLocal = this.translateScore(partido.scoreLocal);
        partido.puntosGameActualVisitante = this.translateScore(partido.scoreVisitante);

        partido.cantidadGamesVisitante++;
        if (partido.cantidadGamesVisitante == 6) {
            partido.estado = Estados.Finalizado;
        }
    }

}

export default new PartidoService();
