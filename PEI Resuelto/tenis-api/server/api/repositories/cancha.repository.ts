import { Cancha } from '../model/cancha';
import { EntityRepository, AbstractRepository } from "typeorm";

@EntityRepository(Cancha)
export class CanchaRepository extends AbstractRepository<Cancha> {

    constructor() {
        super();
    }

    update = (id: number, cancha: Cancha): Promise<Cancha> => {
        return this.repository.findOne(id)
            .then(r => {
                if (!r) return;
                //this.repository.merge(r, player);
                const updateEntity = {
                    ...r,
                    ...cancha,
                    id: r.id
                }
                return this.repository.save(updateEntity);
            })
    }

    save = (cancha: Cancha): Promise<Cancha> => {
        return this.repository.save(cancha);
    }

    remove = (id: number): Promise<Cancha> => {
        return this.repository.findOne(id)
            .then(r => {
                if (!r) return;

                return this.repository.remove(r);
            })
    }

    findOne = (id: number): Promise<Cancha> => {
        return this.repository.findOne(id);
    }

    findAll = (): Promise<Array<Cancha>> => {
        return this.repository.find({ relations: ["partidos"], order: { nombre: 'ASC' } });
    }

}

