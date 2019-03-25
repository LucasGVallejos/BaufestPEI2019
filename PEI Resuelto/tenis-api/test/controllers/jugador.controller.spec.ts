import Controller from '../../server/api/controllers/jugador/controller';
import JugadorService from '../../server/api/services/jugador.service';
import { Jugador } from '../../server/api/model/jugador';

describe('JugadorController Tests', () => {

    let req: any;
    let res: any;

    beforeEach(() => {
        req = {};
        res = {
            json: jasmine.createSpy('json'),
            status: jasmine.createSpy('status').and.returnValue({ end: jasmine.createSpy('end') })
        };
    });

    it ('should findOne Jugador', async () => {
        req.params = { id: 5 };

        let jugadorServiceSpy = spyOn(JugadorService, 'findOne')
            .and.returnValue(Promise.resolve({ id: 5, nombre: 'Pepe', puntos: 1000 } as Jugador));

        await Controller.findOne(req, res);
        
        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith({ id: 5, nombre: 'Pepe', puntos: 1000 });
        
        expect(jugadorServiceSpy).toHaveBeenCalledTimes(1);
        expect(jugadorServiceSpy).toHaveBeenCalledWith(5);
    });

    it('should save Jugador', async () => {
        req.body = { nombre: 'Pepe', puntos: 1000 };

        let jugadorServiceSpy = spyOn(JugadorService, 'save')
            .and.returnValue(Promise.resolve({ id: 5, nombre: 'Pepe', puntos: 1000 } as Jugador));

        await Controller.save(req, res);

        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith({ id: 5, nombre: 'Pepe', puntos: 1000 });
        
        expect(jugadorServiceSpy).toHaveBeenCalledTimes(1);
        expect(jugadorServiceSpy).toHaveBeenCalledWith(new Jugador('Pepe', 1000));
    });

    it('should update Jugador', async () => {
        req.body = { nombre: 'Pepe', puntos: 1000 };
        req.params = { id: 5 };
        
        let jugadorServiceSpy = spyOn(JugadorService, 'update')
            .and.returnValue(Promise.resolve({ id: 5, nombre: 'Pepe', puntos: 1000 } as Jugador));

        await Controller.update(req, res);

        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith({ id: 5, nombre: 'Pepe', puntos: 1000 });
        
        expect(jugadorServiceSpy).toHaveBeenCalledTimes(1);
        expect(jugadorServiceSpy).toHaveBeenCalledWith(5, req.body);
    });

    it('should remove Jugador', async () => {
        req.params = { id: 5 };
        
        let jugadorServiceSpy = spyOn(JugadorService, 'remove')
            .and.returnValue(Promise.resolve({ id: 5, nombre: 'Pepe', puntos: 1000 } as Jugador));

        await Controller.remove(req, res);

        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith({ id: 5, nombre: 'Pepe', puntos: 1000 });
        
        expect(jugadorServiceSpy).toHaveBeenCalledTimes(1);
        expect(jugadorServiceSpy).toHaveBeenCalledWith(5);
    });

    it('should getAll Jugadores', async () => {
        let jugadores = [
            { id: 5, nombre: 'Pepe', puntos: 1000 } as Jugador,
            { id: 6, nombre: 'Maria', puntos: 1250 } as Jugador
        ];
        
        let jugadorServiceSpy = spyOn(JugadorService, 'getAll')
            .and.returnValue(Promise.resolve(jugadores));

        await Controller.getAll(req, res);

        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith(jugadores);
        
        expect(jugadorServiceSpy).toHaveBeenCalledTimes(1);
        expect(jugadorServiceSpy).toHaveBeenCalledWith();
    });

});