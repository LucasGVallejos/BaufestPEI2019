import JugadorService from '../../server/api/services/jugador.service';
import * as typeorm from "typeorm";
import { JugadorRepository } from '../../server/api/repositories/jugador.repository';
import { Jugador } from '../../server/api/model/jugador';
import { PartidorRepository } from '../../server/api/repositories/partido.repository';
import { Partido } from '../../server/api/model/partido';
import { Estados } from '../../server/api/dtos/estados.enum';

describe('JugadorService Tests', () => {

    let customRepositorySpy;
    let jugadorRepositorySpy;
    let partidoRepositorySpy: PartidorRepository;

    beforeEach(() => {
        jugadorRepositorySpy = {} as JugadorRepository;
        partidoRepositorySpy = {} as PartidorRepository;
        customRepositorySpy = spyOn(typeorm, 'getCustomRepository')
            .withArgs(JugadorRepository).and.returnValue(jugadorRepositorySpy)
            .withArgs(PartidorRepository).and.returnValue(partidoRepositorySpy);
    });

    it('should save Jugador', () => {
        let jugador = { id: 5, nombre: 'Pepe', puntos: 1000 } as Jugador;

        jugadorRepositorySpy.save = jasmine.createSpy('save').and.callFake((j) => Promise.resolve(j));

        JugadorService.save(jugador).then(j => {
            expect(j).toBe(jugador);

            expect(customRepositorySpy).toHaveBeenCalledTimes(1);

            expect(jugadorRepositorySpy.save).toHaveBeenCalledTimes(1);
            expect(jugadorRepositorySpy.save).toHaveBeenCalledWith(jugador);
        });
    });

    it('should update Jugador', () => {
        let jugador = { id: 5, nombre: 'Pepe', puntos: 1000 } as Jugador;

        jugadorRepositorySpy.update = jasmine.createSpy('update').and.callFake((id, j) => Promise.resolve(j));

        JugadorService.update(5, jugador).then(j => {
            expect(j).toBe(jugador);

            expect(customRepositorySpy).toHaveBeenCalledTimes(1);

            expect(jugadorRepositorySpy.update).toHaveBeenCalledTimes(1);
            expect(jugadorRepositorySpy.update).toHaveBeenCalledWith(5, jugador);
        });
    });

    it('should remove Jugador', () => {
        let jugador = { id: 5, nombre: 'Pepe', puntos: 1000 } as Jugador;

        jugadorRepositorySpy.remove = jasmine.createSpy('remove').and.returnValue(Promise.resolve(jugador));

        JugadorService.remove(5).then(j => {
            expect(j).toBe(jugador);

            expect(customRepositorySpy).toHaveBeenCalledTimes(1);

            expect(jugadorRepositorySpy.remove).toHaveBeenCalledTimes(1);
            expect(jugadorRepositorySpy.remove).toHaveBeenCalledWith(5);
        });
    });

    it('should find one Jugador', () => {
        let jugador = { id: 5, nombre: 'Pepe', puntos: 1000 } as Jugador;
        jugadorRepositorySpy.findOne = jasmine.createSpy('findOne').and.returnValue(Promise.resolve(jugador));

        JugadorService.findOne(5).then(j => {
            expect(j).toBe(jugador);

            expect(customRepositorySpy).toHaveBeenCalledTimes(1);

            expect(jugadorRepositorySpy.findOne).toHaveBeenCalledTimes(1);
            expect(jugadorRepositorySpy.findOne).toHaveBeenCalledWith(5);
        });
    });

    it('should get all Jugadores', () => {
        let jugador = { id: 5, nombre: 'Pepe', puntos: 1000 } as Jugador;
        let jugadores = [jugador];

        jugadorRepositorySpy.findAll = jasmine.createSpy('findAll').and.returnValue(Promise.resolve(jugadores));

        JugadorService.getAll().then(j => {
            expect(j).toBe(jugadores);

            expect(customRepositorySpy).toHaveBeenCalledTimes(1);

            expect(jugadorRepositorySpy.findAll).toHaveBeenCalledTimes(1);
        });
    });

    it('Calculo Ranking Gano 1 Partido Local', () => {
        var jugador = { id: 1, puntos: 0 } as Jugador;
        
        calculoRankingSetters(
            jugador,
            [new Partido], // ganados local
            [], // ganados visitante
            [] // perdidos local
        );

        JugadorService.recalculateRanking(jugador.id).then(jugadorResultado => {
            expect(jugadorResultado.puntos).toBe(10);
            expect(jugadorRepositorySpy.update).toHaveBeenCalledTimes(1);
        });
    })

    it('Calculo Ranking Gano 3 Partidos Local Gano 2 Visitante', () => {
        var jugador = { id: 1, puntos: 50 } as Jugador;

        calculoRankingSetters(
            jugador,
            [new Partido, new Partido, new Partido], // ganados local
            [new Partido, new Partido], // ganados visitante
            [] // perdidos local
        );

        JugadorService.recalculateRanking(jugador.id).then(jugadorResultado => {
            expect(jugadorResultado.puntos).toBe(60);
            expect(jugadorRepositorySpy.update).toHaveBeenCalledTimes(1);
        });
    })

    it('Calculo Ranking Perdio 2 Partidos Local', () => {
        var jugador = { id: 1, puntos: 50 } as Jugador;

        calculoRankingSetters(
            jugador,
            [], // ganados local
            [], // ganados visitante
            [new Partido, new Partido] // perdidos local
        );

        JugadorService.recalculateRanking(jugador.id).then(jugadorResultado => {
            expect(jugadorResultado.puntos).toBe(0);
            expect(jugadorRepositorySpy.update).toHaveBeenCalledTimes(1);
        });
    })

    it('Calculo Ranking Perdio 2 Partidos Visitante', () => {
        var jugador = { id: 1, puntos: 50 } as Jugador;

        calculoRankingSetters(
            jugador,
            [], // ganados local
            [], // ganados visitante
            [] // perdidos local
        );

        JugadorService.recalculateRanking(jugador.id).then(jugadorResultado => {
            expect(jugadorResultado.puntos).toBe(0);
            expect(jugadorRepositorySpy.update).toHaveBeenCalledTimes(1);
        });
    })

    it('Calculo Ranking Gano 2 Local 1 Visitante Perdio 3 Local', () => {
        var jugador = { id: 1, puntos: 0 } as Jugador;

        calculoRankingSetters(
            jugador,
            [new Partido, new Partido], // ganados local
            [new Partido], // ganados visitante
            [new Partido, new Partido, new Partido] // perdidos local
        );

        JugadorService.recalculateRanking(jugador.id).then(jugadorResultado => {
            expect(jugadorResultado.puntos).toBe(20);
            expect(jugadorRepositorySpy.update).toHaveBeenCalledTimes(1);
        });
    })

    function calculoRankingSetters(jugador: Jugador, listGanadosLocal, listGanadosVisitante, listPerdidosLocal) {

        jugadorRepositorySpy.findOne = jasmine.createSpy('findOne').and.returnValue(Promise.resolve(jugador));
        jugadorRepositorySpy.update = jasmine.createSpy('update').and.callFake((id, partido) => partido);

        JugadorService.listPartidosGanadosLocalDeJugador = jasmine.createSpy('listPartidosGanadosLocalDeJugador')
            .and.returnValue(listGanadosLocal);
        JugadorService.listPartidosGanadosVisitanteDeJugador = jasmine.createSpy('listPartidosGanadosVisitanteDeJugador')
            .and.returnValues(listGanadosVisitante);
        JugadorService.listPartidosPerdidosLocalDeJugador = jasmine.createSpy('listPartidosPerdidosLocalDeJugador')
            .and.returnValues(listPerdidosLocal);

        partidoRepositorySpy.findAll = jasmine.createSpy('findOne').and.returnValue(Promise.resolve([]));
    }
});