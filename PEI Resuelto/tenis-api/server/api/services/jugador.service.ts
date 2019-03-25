//import Promise from 'bluebird';
import L from '../../common/logger'
import { Jugador } from '../model/jugador';
import { JugadorRepository } from '../repositories/jugador.repository'
import { PartidorRepository } from '../repositories/partido.repository';
import { getCustomRepository } from "typeorm";
import { Partido } from '../model/partido';
import { Estados } from '../dtos/estados.enum';

export class JugadorService {
    
    save(player: Jugador): Promise<Jugador> {
        return getCustomRepository(JugadorRepository).save(player);
    }

    update(id: number, player: any): Promise<Jugador> {
        return getCustomRepository(JugadorRepository).update(id, player);
    }

    recalculateRanking(id: number): Promise<Jugador> {

        // Inicializa los repositories
        const jugadorRepository = getCustomRepository(JugadorRepository);
        const partidoRepository = getCustomRepository(PartidorRepository);

        // Obtiene al jugador
        return jugadorRepository.findOne(id).then(jugador => {
            return partidoRepository.findAll().then(partidos => {

                // Define las constantes con los indices definidos para el calculo
                const INDICADOR_GANADOS_LOCAL: number = 10;
                const INDICADOR_GANADOS_VISITANTE: number = 15;
                const INDICADOR_PERDIDOS_LOCAL: number = -5;
                //const INDICADOR_PERDIDOS_VISITANTE: number = 0;

                // Inicializa el ranking inicial
                let ranking: number = 0;

                let partidosGanadosLocal = this.listPartidosGanadosLocalDeJugador(id, partidos);
                let partidosGanadosVisitante = this.listPartidosGanadosVisitanteDeJugador(id, partidos);
                let partidosPerdidosLocal = this.listPartidosPerdidosLocalDeJugador(id, partidos);

                // Realiza el calculo por cada indicador
                ranking += partidosGanadosLocal.length * INDICADOR_GANADOS_LOCAL;
                ranking += partidosGanadosVisitante.length * INDICADOR_GANADOS_VISITANTE;
                ranking += partidosPerdidosLocal.length * INDICADOR_PERDIDOS_LOCAL;

                // Si el ranking obtenido es menor a 0 se setea en 0
                if (ranking < 0) {
                    ranking = 0;
                }

                // Se retean los puntos en el jugador
                return jugadorRepository.update(id, { puntos: ranking } as Jugador);
            });
        });
    }

    remove(id: number): Promise<Jugador> {
        return getCustomRepository(JugadorRepository).remove(id);
    }

    findOne(id: number): Promise<Jugador> {
        return getCustomRepository(JugadorRepository).findOne(id);
    }

    getAll(): Promise<Array<Jugador>> {
        return getCustomRepository(JugadorRepository).findAll();
    }

    listPartidosGanadosLocalDeJugador(id: number, partidos: Partido[]): Partido[] {
        return partidos.filter(x => x.estado == Estados.Finalizado && x.jugadorLocal.id == id && x.cantidadGamesLocal == 6);
    }

    listPartidosGanadosVisitanteDeJugador(id: number, partidos: Partido[]): Partido[] {
        return partidos.filter(x => x.estado == Estados.Finalizado && x.jugadorVisitante.id == id && x.cantidadGamesVisitante == 6);
    }

    listPartidosPerdidosLocalDeJugador(id: number, partidos: Partido[]): Partido[] {
        return partidos.filter(x => x.estado == Estados.Finalizado && x.jugadorLocal.id == id && x.cantidadGamesVisitante == 6);
    }
}

export default new JugadorService();