import { Partido } from '../model/partido';
import { EntityRepository, AbstractRepository } from "typeorm";

@EntityRepository(Partido)
export class PartidorRepository extends AbstractRepository<Partido> {

	constructor() {
        super();
	}

    update  = (id:number, partido: Partido): Promise<Partido> => {
        return this.repository.findOne(id)
            .then(r => {
                if (!r) return;

                //this.repository.merge(r, partido);
                const updateEntity = {
                    ...r,
                    ...partido,
                    id: r.id
                }

                return this.repository.save(updateEntity);
            })
    }

    save = (player: Partido) : Promise<Partido> =>{
        return this.repository.save(player);
    }

    remove = (id: number): Promise<Partido> => {
        return this.repository.findOne(id)
        .then(r => {
            if (!r) return;

            return this.repository.remove(r);
        })
    }

    findOne =(id: number): Promise<Partido> => {
       return  this.repository.findOne(id);
    }

    findAll = () : Promise<Array<Partido>> =>{
        return this.repository.find({ order: { estado: "ASC", fechaComienzo: "ASC" } });
    }

}

