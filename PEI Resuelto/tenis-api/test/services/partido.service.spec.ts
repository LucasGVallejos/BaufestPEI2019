import * as typeorm from "typeorm";
import { PartidorRepository } from '../../server/api/repositories/partido.repository'
import { Partido } from "../../server/api/model/partido";
import PartidoService from '../../server/api/services/partido.service';
import ModosJugador from "../../server/api/dtos/modos.jugador.enum";
import { Estados } from "../../server/api/dtos/estados.enum";
import { Cancha } from "../../server/api/model/cancha";

describe('PartidoServiceTests', () => {
    let customRepositorySpy;
    let partidoRepositorySpy;

    beforeEach(() => {
        partidoRepositorySpy = {} as PartidorRepository;
        customRepositorySpy = spyOn(typeorm, 'getCustomRepository').and.returnValue(partidoRepositorySpy);
    });

    // it('should save Partido', () => {        
    //     let partido = {id: 1, scoreLocal: 0, scoreVisitante: 0, estado: Estados.EnCurso} as Partido;
    //     partidoRepositorySpy.save = jasmine.createSpy('save').and.returnValue(Promise.resolve(partido));
    //     PartidoService.save(partido).then(p => {
    //         expect(p).toBe(partido);

    //         expect(customRepositorySpy).toHaveBeenCalledTimes(1);
    //         expect(partidoRepositorySpy.save).toHaveBeenCalledTimes(1);
    //         expect(partidoRepositorySpy.save).toHaveBeenCalledWith(partido);
    //     });
    // })

    // it('should update Partido', () => {        
    //     let partido = {id: 1, scoreLocal: 0, scoreVisitante: 0, estado: Estados.EnCurso} as Partido;
    //     partidoRepositorySpy.update = jasmine.createSpy('update').and.returnValue(Promise.resolve(partido));
    //     PartidoService.update(1, partido).then(p => {
    //         expect(p).toBe(partido);

    //         expect(customRepositorySpy).toHaveBeenCalledTimes(1);
    //         expect(partidoRepositorySpy.update).toHaveBeenCalledTimes(1);
    //         expect(partidoRepositorySpy.update).toHaveBeenCalledWith(1, partido);
    //     });
    // })

    // it('should remove Partido', () => {        
    //     let partido = {id: 1, scoreLocal: 0, scoreVisitante: 0, estado: Estados.EnCurso} as Partido;
    //     partidoRepositorySpy.remove = jasmine.createSpy('remove').and.returnValue(Promise.resolve(partido));
    //     PartidoService.remove(1).then(p => {
    //         expect(p).toBe(partido);

    //         expect(customRepositorySpy).toHaveBeenCalledTimes(1);
    //         expect(partidoRepositorySpy.remove).toHaveBeenCalledTimes(1);
    //         expect(partidoRepositorySpy.remove).toHaveBeenCalledWith(1);
    //     });
    // })

    // it('should find one Partido', () => {        
    //     let partido = {id: 1, scoreLocal: 0, scoreVisitante: 0, estado: Estados.EnCurso} as Partido;
    //     partidoRepositorySpy.findOne = jasmine.createSpy('findOne').and.returnValue(Promise.resolve(partido));
    //     PartidoService.findOne(1).then(p => {
    //         expect(p).toBe(partido);

    //         expect(customRepositorySpy).toHaveBeenCalledTimes(1);
    //         expect(partidoRepositorySpy.findOne).toHaveBeenCalledTimes(1);
    //         expect(partidoRepositorySpy.findOne).toHaveBeenCalledWith(1);
    //     });
    // })

    // it('should get all Partidos', () => {        
    //     let partido = {id: 1, scoreLocal: 0, scoreVisitante: 0, estado: Estados.EnCurso} as Partido;
    //     const partidos = [partido];
    //     partidoRepositorySpy.findAll = jasmine.createSpy('findAll').and.returnValue(Promise.resolve(partidos));
    //     PartidoService.getAll().then(ps => {
    //         expect(ps).toBe(partidos);

    //         expect(customRepositorySpy).toHaveBeenCalledTimes(1);
    //         expect(partidoRepositorySpy.findAll).toHaveBeenCalledTimes(1);
    //     });
    // })

    // it('should add 1 to local player', () => {        
    //     let partido = {id: 1, scoreLocal: 0, scoreVisitante: 0, estado: Estados.EnCurso} as Partido;
    //     const modo = ModosJugador.Local;
    //     partidoRepositorySpy.findOne = jasmine.createSpy('findOne').and.returnValue(Promise.resolve(partido));
        
    //     let updateMethod = PartidoService.update;
    //     PartidoService.update = () => Promise.resolve(partido);
        
    //     PartidoService.sumarPuntos(1, modo).then(p => {
    //         expect(p.id).toBe(1);
    //         expect(p.scoreLocal).toBe(1);
    //         expect(p.scoreVisitante).toBe(0)

    //         expect(customRepositorySpy).toHaveBeenCalledTimes(1);
    //         expect(partidoRepositorySpy.findOne).toHaveBeenCalledTimes(1);
    //         expect(partidoRepositorySpy.findOne).toHaveBeenCalledWith(1);

    //         PartidoService.update = updateMethod;
    //     });
    // })

    // it('should add 1 to visitant player', () => {        
    //     let partido = {id: 1, scoreLocal: 0, scoreVisitante: 0, estado: Estados.EnCurso} as Partido;
    //     const modo = ModosJugador.Visitante;
    //     partidoRepositorySpy.findOne = jasmine.createSpy('findOne').and.returnValue(Promise.resolve(partido));
        
    //     let updateMethod = PartidoService.update;
    //     PartidoService.update = () => Promise.resolve(partido);
        
    //     PartidoService.sumarPuntos(1, modo).then(p => {
    //         expect(p.id).toBe(1);
    //         expect(p.scoreVisitante).toBe(1);
    //         expect(p.puntosGameActualLocal).toBe('15');
    //         expect(p.scoreVisitante).toBe(0)
    //         expect(p.puntosGameActualLocal).toBe('0');

    //         expect(customRepositorySpy).toHaveBeenCalledTimes(1);
    //         expect(partidoRepositorySpy.findOne).toHaveBeenCalledTimes(1);
    //         expect(partidoRepositorySpy.findOne).toHaveBeenCalledWith(1);

    //         PartidoService.update = updateMethod;
    //     });
    // })

    // it('should add 1 to visitant player', () => {        
    //     let partido = {id: 1, scoreLocal: 0, scoreVisitante: 0, estado: Estados.EnCurso} as Partido;
    //     const modo = ModosJugador.Visitante;
    //     partidoRepositorySpy.findOne = jasmine.createSpy('findOne').and.returnValue(Promise.resolve(partido));
        
    //     let updateMethod = PartidoService.update;
    //     PartidoService.update = () => Promise.resolve(partido);
        
    //     PartidoService.sumarPuntos(1, modo).then(p => {
    //         expect(p.id).toBe(1);
    //         expect(p.scoreVisitante).toBe(1);
    //         expect(p.puntosGameActualVisitante).toBe('15');
    //         expect(p.scoreLocal).toBe(0)
    //         expect(p.puntosGameActualLocal).toBe('0');

    //         expect(p.scoreVisitante).toBe(0)

    //         expect(customRepositorySpy).toHaveBeenCalledTimes(1);
    //         expect(partidoRepositorySpy.findOne).toHaveBeenCalledTimes(1);
    //         expect(partidoRepositorySpy.findOne).toHaveBeenCalledWith(1);

    //         PartidoService.update = updateMethod;
    //     });
    // })

    // it('should set Adv to local player', () => {        
    //     let partido = {id: 1, scoreLocal: 3, scoreVisitante: 3, estado: Estados.EnCurso} as Partido;
    //     const modo = ModosJugador.Local;
    //     partidoRepositorySpy.findOne = jasmine.createSpy('findOne').and.returnValue(Promise.resolve(partido));
        
    //     let updateMethod = PartidoService.update;
    //     PartidoService.update = () => Promise.resolve(partido);
        
    //     PartidoService.sumarPuntos(1, modo).then(p => {
    //         expect(p.id).toBe(1);
    //         expect(p.scoreLocal).toBe(4);
    //         expect(p.puntosGameActualLocal).toBe('Adv');
    //         expect(p.scoreVisitante).toBe(3)
    //         expect(p.puntosGameActualLocal).toBe('40');

    //         expect(customRepositorySpy).toHaveBeenCalledTimes(1);
    //         expect(partidoRepositorySpy.findOne).toHaveBeenCalledTimes(1);
    //         expect(partidoRepositorySpy.findOne).toHaveBeenCalledWith(1);

    //         PartidoService.update = updateMethod;
    //     });
    // })

    // it('should set Adv to visitant player', () => {        
    //     let partido = {id: 1, scoreLocal: 3, scoreVisitante: 3, estado: Estados.EnCurso} as Partido;
    //     const modo = ModosJugador.Visitante;
    //     partidoRepositorySpy.findOne = jasmine.createSpy('findOne').and.returnValue(Promise.resolve(partido));
        
    //     let updateMethod = PartidoService.update;
    //     PartidoService.update = () => Promise.resolve(partido);
        
    //     PartidoService.sumarPuntos(1, modo).then(p => {
    //         expect(p.id).toBe(1);
    //         expect(p.scoreVisitante).toBe(4);
    //         expect(p.puntosGameActualLocal).toBe('Adv');
    //         expect(p.scoreVisitante).toBe(3)
    //         expect(p.puntosGameActualLocal).toBe('40');

    //         expect(customRepositorySpy).toHaveBeenCalledTimes(1);
    //         expect(partidoRepositorySpy.findOne).toHaveBeenCalledTimes(1);
    //         expect(partidoRepositorySpy.findOne).toHaveBeenCalledWith(1);

    //         PartidoService.update = updateMethod;
    //     });
    // })

    // it('should set 40 both players', () => {        
    //     let partido = {id: 1, scoreLocal: 3, scoreVisitante: 4, estado: Estados.EnCurso} as Partido;
    //     const modo = ModosJugador.Local;
    //     partidoRepositorySpy.findOne = jasmine.createSpy('findOne').and.returnValue(Promise.resolve(partido));
        
    //     let updateMethod = PartidoService.update;
    //     PartidoService.update = () => Promise.resolve(partido);
        
    //     PartidoService.sumarPuntos(1, modo).then(p => {
    //         expect(p.id).toBe(1);
    //         expect(p.scoreLocal).toBe(4);
    //         expect(p.puntosGameActualLocal).toBe('40');
    //         expect(p.scoreVisitante).toBe(4)
    //         expect(p.puntosGameActualLocal).toBe('40');

    //         expect(customRepositorySpy).toHaveBeenCalledTimes(1);
    //         expect(partidoRepositorySpy.findOne).toHaveBeenCalledTimes(1);
    //         expect(partidoRepositorySpy.findOne).toHaveBeenCalledWith(1);

    //         PartidoService.update = updateMethod;
    //     });
    // })

    // it('should win game local', () => {        
    //     let partido = {id: 1, scoreLocal: 3, scoreVisitante: 0, estado: Estados.EnCurso, cantidadGamesLocal: 0} as Partido;
    //     const modo = ModosJugador.Local;
    //     partidoRepositorySpy.findOne = jasmine.createSpy('findOne').and.returnValue(Promise.resolve(partido));
        
    //     let updateMethod = PartidoService.update;
    //     PartidoService.update = () => Promise.resolve(partido);
        
    //     PartidoService.sumarPuntos(1, modo).then(p => {
    //         expect(p.id).toBe(1);
    //         expect(p.scoreLocal).toBe(0);
    //         expect(p.puntosGameActualLocal).toBe('0');
    //         expect(p.scoreVisitante).toBe(0)
    //         expect(p.puntosGameActualLocal).toBe('0');
    //         expect(p.estado).toBe(Estados.Finalizado);
    //         expect(p.cantidadGamesLocal).toBe(1);
    //         expect(p.puntosGameActualLocal).toBe('1');

    //         expect(customRepositorySpy).toHaveBeenCalledTimes(1);
    //         expect(partidoRepositorySpy.findOne).toHaveBeenCalledTimes(1);
    //         expect(partidoRepositorySpy.findOne).toHaveBeenCalledWith(1);

    //         PartidoService.update = updateMethod;
    //     });
    // })

    // it('should win game visitant', () => {        
    //     let partido = {id: 1, scoreLocal: 0, scoreVisitante: 3, estado: Estados.EnCurso, cantidadGamesVisitante: 0} as Partido;
    //     const modo = ModosJugador.Visitante;
    //     partidoRepositorySpy.findOne = jasmine.createSpy('findOne').and.returnValue(Promise.resolve(partido));
        
    //     let updateMethod = PartidoService.update;
    //     PartidoService.update = () => Promise.resolve(partido);
        
    //     PartidoService.sumarPuntos(1, modo).then(p => {
    //         expect(p.id).toBe(1);
    //         expect(p.scoreLocal).toBe(0);
    //         expect(p.puntosGameActualLocal).toBe('0');
    //         expect(p.scoreVisitante).toBe(0)
    //         expect(p.puntosGameActualLocal).toBe('0');
    //         expect(p.estado).toBe(Estados.Finalizado);
    //         expect(p.cantidadGamesVisitante).toBe(1);
    //         expect(p.puntosGameActualVisitante).toBe('1');

    //         expect(customRepositorySpy).toHaveBeenCalledTimes(1);
    //         expect(partidoRepositorySpy.findOne).toHaveBeenCalledTimes(1);
    //         expect(partidoRepositorySpy.findOne).toHaveBeenCalledWith(1);

    //         PartidoService.update = updateMethod;
    //     });
    // })
})