import JugadorService from '../../services/jugador.service';
import { Request, Response } from 'express';
import { Jugador } from '../../model/jugador';
import { ResponseCode } from '../../response-codes.enum';

export class Controller {
    findOne(req: Request, res: Response): void {
        const id = req.params.id;

        JugadorService.findOne(id)
            .then(r => {
                if (!r) {
                    res.status(ResponseCode.NotFound).end();
                } else {
                    res.json(r);
                }
            })
            .catch(err => res.status(ResponseCode.InternalServerError).end());
    }

    save(req: Request, res: Response): void {
        const jugador = req.body;
        JugadorService.save(new Jugador(jugador.nombre, jugador.puntos))
            .then(r => res.json(r))
            .catch(err => console.error(err));
    }

    update(req: Request, res: Response): void {
        const id = req.params.id;
        const jugador = req.body;

        JugadorService.update(id, jugador).then(r => {
            if (!r) return res.status(ResponseCode.NotFound).end();

            res.json(r);
        }).catch(err => res.status(ResponseCode.InternalServerError).end());
    }

    recalculateRanking(req: Request, res: Response): void {
        const id = req.params.id;

        JugadorService.recalculateRanking(id).then(r => {
            if (!r) return res.status(ResponseCode.NotFound).end();

            res.json(r);
        }).catch(err => res.status(ResponseCode.InternalServerError).end());
    }

    remove(req: Request, res: Response): void {
        const id = req.params.id;

        JugadorService.remove(id).then(r => {
            if (!r) return res.status(ResponseCode.NotFound).end();

            res.json(r);
        }).catch(err => res.status(ResponseCode.InternalServerError).end());
    }

    getAll(req: Request, res: Response): void {
        JugadorService.getAll()
            .then(r => res.json(r))
            .catch(err => res.status(ResponseCode.InternalServerError).end());
    }
}

export default new Controller();