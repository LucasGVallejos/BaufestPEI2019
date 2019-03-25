import { Jugador } from '../model/jugador';
import { EntityRepository, AbstractRepository } from "typeorm";

@EntityRepository(Jugador)
export class JugadorRepository extends AbstractRepository<Jugador> {

    constructor() {
        super();
    }

    update = (id: number, player: Jugador): Promise<Jugador> => {
        return this.repository.findOne(id)
            .then(r => {
                if (!r) return;
                //this.repository.merge(r, player);
                const updateEntity = {
                    ...r,
                    ...player,
                    id: r.id
                }
                return this.repository.save(updateEntity);
            })
    }

    save = (player: Jugador): Promise<Jugador> => {
        return this.repository.save(player);
    }

    remove = (id: number): Promise<Jugador> => {
        return this.repository.findOne(id)
            .then(r => {
                if (!r) return;

                return this.repository.remove(r);
            })
    }

    findOne = (id: number): Promise<Jugador> => {
        return this.repository.findOne(id);
    }

    findAll = (): Promise<Array<Jugador>> => {
        return this.repository.find({ order: { nombre: 'ASC' } });
    }

}

