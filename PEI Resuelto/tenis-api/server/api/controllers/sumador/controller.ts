import PartidoService from '../../services/partido.service';
import { Request, Response } from 'express';
import { ResponseCode } from '../../response-codes.enum';
import PuntoRequest from '../../dtos/puntos.request';

export class Controller {

    sumarPuntos(req: Request, res: Response): void {
        const dataScore: PuntoRequest = req.body;

        if (isNaN(dataScore.partidoId) || dataScore.partidoId == 0)
            return res.status(ResponseCode.BadRequest).end();

        PartidoService.sumarPuntos(dataScore.partidoId, dataScore.modoJugador)
            .then(partido => {
                if (!partido) return res.status(ResponseCode.NotFound).end();

                res.json(partido);
            })
            .catch(err => {
                console.error(err);
                res.status(ResponseCode.InternalServerError).end();
            });

    }

}

export default new Controller();
