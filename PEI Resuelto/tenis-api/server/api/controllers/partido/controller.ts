import PartidoService from '../../services/partido.service';
import { Request, Response } from 'express';
import { ResponseCode } from '../../response-codes.enum';
import l from '../../../common/logger';

export class Controller {
    findOne(req: Request, res: Response): void {
        if (isNaN(req.params.id) || req.params.id == 0)
            return res.status(ResponseCode.BadRequest).end();

        PartidoService.findOne(req.params.id)
            .then(partido => {
                if (!partido) return res.status(ResponseCode.NotFound).end();

                res.json(partido);
            })
            .catch(err => {
                console.error(err);
                res.status(ResponseCode.InternalServerError).end();
            });
    }

    save(req: Request, res: Response): void {
        const partido = req.body;
        PartidoService.save(partido)
            .then(r => res.json(r))
            .catch(err => {
                res.status(ResponseCode.InternalServerError).end();
            });
    }

    update(req: Request, res: Response): void {
        const id = req.params.id;
        const partido = req.body;

        PartidoService.update(id, partido).then(r => {
            if (!r) return res.status(ResponseCode.NotFound).end();

            res.json(r);
        }).catch(err => {
            l.error(err);            
            res.status(ResponseCode.InternalServerError).send({error: err.message}).end();
        });
    }

    initGame(req: Request, res: Response): void {
        const id = req.params.id;

        PartidoService.initGame(id).then(r => {
            if (!r) return res.status(ResponseCode.NotFound).end();

            res.json(r);
        }).catch(err => res.status(ResponseCode.InternalServerError).end());
    }

    remove(req: Request, res: Response): void {
        const id = req.params.id;
        PartidoService.remove(id).then(r => {
            if (!r) return res.status(ResponseCode.NotFound).end();

            res.json(r);
        }).catch(err => res.status(ResponseCode.InternalServerError).end());
    }

    getAll(req: Request, res: Response): void {
        PartidoService.getAll()
            .then(r => res.json(r))
            .catch(err => res.status(ResponseCode.InternalServerError).end());
    }
}

export default new Controller();
