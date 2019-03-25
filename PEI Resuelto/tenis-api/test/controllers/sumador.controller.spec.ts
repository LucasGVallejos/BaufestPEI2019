import Controller from '../../server/api/controllers/sumador/controller';
import PartidorService from '../../server/api/services/partido.service';
import PuntoRequest from '../../server/api/dtos/puntos.request';
import { Partido } from '../../server/api/model/partido';
import { Estados } from '../../server/api/dtos/estados.enum';

describe('SumadorController Tests', () => {

    let req: any;
    let res: any;

    beforeEach(() => {
        req = {};
        res = {
            json: jasmine.createSpy('json'),
            status: jasmine.createSpy('status').and.returnValue({ end: jasmine.createSpy('end') })
        };
    });

    it ('should sumarPuntos local', async () => {
        req.body = { partidoId: 3, modoJugador: 'Local' } as PuntoRequest;

        let partidoServiceSpy = spyOn(PartidorService, 'sumarPuntos')
            .and.returnValue(Promise.resolve({ id: 3, estado: Estados.EnCurso, puntosGameActualLocal: '15' } as Partido));

        await Controller.sumarPuntos(req, res);
        
        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith({ id: 3, estado: Estados.EnCurso, puntosGameActualLocal: '15' });
        
        expect(partidoServiceSpy).toHaveBeenCalledTimes(1);
        expect(partidoServiceSpy).toHaveBeenCalledWith(3, 'Local');
    });

});