import Controller from '../../server/api/controllers/cancha/controller';
import CanchaService from '../../server/api/services/cancha.service';
import { Cancha } from '../../server/api/model/cancha';

describe('CanchaController Tests', () => {

    let req: any;
    let res: any;

    beforeEach(() => {
        req = {};
        res = {
            json: jasmine.createSpy('json'),
            status: jasmine.createSpy('status').and.returnValue({ end: jasmine.createSpy('end') })
        };
    });

    it('should findOne Cancha', async () => {
        req.params = { id: 5 };

        let CanchaServiceSpy = spyOn(CanchaService, 'findOne')
            .and.returnValue(Promise.resolve({ id: 5, nombre: 'cancha', direccion: 'dirección' } as Cancha));

        await Controller.findOne(req, res);
        
        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith({ id: 5, nombre: 'cancha', direccion: 'dirección' });
        
        expect(CanchaServiceSpy).toHaveBeenCalledTimes(1);
        expect(CanchaServiceSpy).toHaveBeenCalledWith(5);
    });

    it('should save Cancha', async () => {
        req.body = { nombre: 'cancha', direccion: 'direccion' };

        let canchaServiceSpy = spyOn(CanchaService, 'save')
            .and.returnValue(Promise.resolve({ id: 5, nombre: 'cancha', direccion: 'direccion' } as Cancha));

        await Controller.save(req, res);

        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith({ id: 5, nombre: 'cancha', direccion: 'direccion' });
        
        expect(canchaServiceSpy).toHaveBeenCalledTimes(1);
        expect(canchaServiceSpy).toHaveBeenCalledWith({ nombre: 'cancha', direccion: 'direccion' });
    });

    it('should update Cancha', async () => {
        req.body = { nombre: 'cancha', direccion: 'dirección' };
        req.params = { id: 5 };
        
        let canchaServiceSpy = spyOn(CanchaService, 'update')
            .and.returnValue(Promise.resolve({ id: 5, nombre: 'cancha', direccion: 'dirección' } as Cancha));

        await Controller.update(req, res);

        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith({ id: 5, nombre: 'cancha', direccion: 'dirección' });
        
        expect(canchaServiceSpy).toHaveBeenCalledTimes(1);
        expect(canchaServiceSpy).toHaveBeenCalledWith(5, req.body);
    });

    it('should remove Cancha', async () => {
        req.params = { id: 5 };
        
        let canchaServiceSpy = spyOn(CanchaService, 'remove')
            .and.returnValue(Promise.resolve({ id: 5, nombre: 'cancha', direccion: 'dirección' } as Cancha));

        await Controller.remove(req, res);

        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith({ id: 5, nombre: 'cancha', direccion: 'dirección' });
        
        expect(canchaServiceSpy).toHaveBeenCalledTimes(1);
        expect(canchaServiceSpy).toHaveBeenCalledWith(5);
    });

    it('should getAll Canchas', async () => {
        let canchas = [
            { id: 5, nombre: 'cancha 1', direccion: 'dirección 1' } as Cancha,
            { id: 6, nombre: 'cancha 2', direccion: 'dirección 2' } as Cancha
        ];

        let canchaServiceSpy = spyOn(CanchaService, 'getAll')
            .and.returnValue(Promise.resolve(canchas));

        await Controller.getAll(req, res);

        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith(canchas);
        
        expect(canchaServiceSpy).toHaveBeenCalledTimes(1);
        expect(canchaServiceSpy).toHaveBeenCalledWith();
    });

});