//import Promise from 'bluebird';
import L from '../../common/logger'
import { Cancha } from '../model/cancha';
import { CanchaRepository } from '../repositories/cancha.repository'
import { getCustomRepository } from "typeorm";

export class CanchaService {

    save(cancha: Cancha): Promise<Cancha> {
        return getCustomRepository(CanchaRepository).save(cancha);
    }

    update(id: number, cancha: any): Promise<Cancha> {
        return getCustomRepository(CanchaRepository).update(id, cancha);
    }

    remove(id: number): Promise<Cancha> {
        return getCustomRepository(CanchaRepository).remove(id);
    }

    findOne(id: number): Promise<Cancha> {
        return getCustomRepository(CanchaRepository).findOne(id);
    }

    getAll(): Promise<Array<Cancha>> {
        return getCustomRepository(CanchaRepository).findAll();
    }
}

export default new CanchaService();
