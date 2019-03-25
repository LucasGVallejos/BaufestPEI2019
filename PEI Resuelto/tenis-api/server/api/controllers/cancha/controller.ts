import CanchaService from '../../services/cancha.service';
import { Request, Response } from 'express';
import { Cancha } from '../../model/cancha';
import { ResponseCode } from '../../response-codes.enum';

export class Controller {
    findOne(req: Request, res: Response): void {
        const id = req.params.id;

        CanchaService.findOne(id)
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
        const cancha = req.body;
        CanchaService.save(cancha)
            .then(r => res.json(r))
            .catch(err => console.error(err));
    }

    update(req: Request, res: Response): void {
        const id = req.params.id;
        const cancha = req.body;

        CanchaService.update(id, cancha).then(r => {
            if (!r) return res.status(ResponseCode.NotFound).end();

            res.json(r);
        }).catch(err => res.status(ResponseCode.InternalServerError).end());
    }

    remove(req: Request, res: Response): void {
        const id = req.params.id;

        CanchaService.remove(id).then(r => {
            if (!r) return res.status(ResponseCode.NotFound).end();

            res.json(r);
        }).catch(err => res.status(ResponseCode.InternalServerError).end());
    }

    getAll(req: Request, res: Response): void {
        CanchaService.getAll()
            .then(r => res.json(r))
            .catch(err => res.status(ResponseCode.InternalServerError).end());
    }
}

export default new Controller();
