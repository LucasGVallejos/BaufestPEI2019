process.env.LOG_LEVEL = 'error';

import Controller from '../../server/api/controllers/partido/controller';
import PartidorService from '../../server/api/services/partido.service';
import { Partido } from '../../server/api/model/partido';
import { Estados } from '../../server/api/dtos/estados.enum';

describe('PartidoController Tests', () => {

    let req: any;
    let res: any;

    beforeEach(() => {
        req = {};
        res = {
            json: jasmine.createSpy('json'),
            status: jasmine.createSpy('status').and.returnValue({ end: jasmine.createSpy('end') })
        };
    });

    it ('should findOne Partido', async () => {
        req.params = { id: 3 };

        let partidoServiceSpy = spyOn(PartidorService, 'findOne')
            .and.returnValue(Promise.resolve({ id: 3, estado: Estados.EnCurso } as Partido));

        await Controller.findOne(req, res);
        
        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith({ id: 3, estado: Estados.EnCurso });
        
        expect(partidoServiceSpy).toHaveBeenCalledTimes(1);
        expect(partidoServiceSpy).toHaveBeenCalledWith(3);
    });

    it('should save Partido', async () => {
        req.body = { id: 3, estado: Estados.EnCurso };

        let partidoServiceSpy = spyOn(PartidorService, 'save')
            .and.returnValue(Promise.resolve({ id: 3, estado: Estados.EnCurso } as Partido));

        await Controller.save(req, res);

        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith({ id: 3, estado: Estados.EnCurso });
        
        expect(partidoServiceSpy).toHaveBeenCalledTimes(1);
        expect(partidoServiceSpy).toHaveBeenCalledWith(req.body);
    });

    it('should update Partido', async () => {
        req.body = { nombre: 'Pepe', puntos: 1000 };
        req.params = { id: 3 };
        
        let partidoServiceSpy = spyOn(PartidorService, 'update')
            .and.returnValue(Promise.resolve({ id: 3, estado: Estados.EnCurso } as Partido));

        await Controller.update(req, res);

        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith({ id: 3, estado: Estados.EnCurso });
        
        expect(partidoServiceSpy).toHaveBeenCalledTimes(1);
        expect(partidoServiceSpy).toHaveBeenCalledWith(3, req.body);
    });

    it('should remove Partido', async () => {
        req.params = { id: 3 };
        
        let partidoServiceSpy = spyOn(PartidorService, 'remove')
            .and.returnValue(Promise.resolve({ id: 3, estado: Estados.EnCurso } as Partido));

        await Controller.remove(req, res);

        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith({ id: 3, estado: Estados.EnCurso });
        
        expect(partidoServiceSpy).toHaveBeenCalledTimes(1);
        expect(partidoServiceSpy).toHaveBeenCalledWith(3);
    });

    it('should getAll Partidos', async () => {
        let partidos = [
            { id: 3, estado: Estados.EnCurso } as Partido,
            { id: 4, estado: Estados.Finalizado, cantidadGamesLocal: 6, cantidadGamesVisitante: 0 } as Partido
        ];
        
        let partidoServiceSpy = spyOn(PartidorService, 'getAll')
            .and.returnValue(Promise.resolve(partidos));

        await Controller.getAll(req, res);

        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith(partidos);
        
        expect(partidoServiceSpy).toHaveBeenCalledTimes(1);
        expect(partidoServiceSpy).toHaveBeenCalledWith();
    });

    it('should initGame', async () => {
        req.params = { id: 3 };
        
        let partidoServiceSpy = spyOn(PartidorService, 'initGame')
            .and.returnValue(Promise.resolve({ id: 3, estado: Estados.EnCurso } as Partido));

        await Controller.initGame(req, res);

        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith({ id: 3, estado: Estados.EnCurso });
        
        expect(partidoServiceSpy).toHaveBeenCalledTimes(1);
        expect(partidoServiceSpy).toHaveBeenCalledWith(3);
    });

});