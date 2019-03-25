import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Jugador {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string;
    @Column()
    puntos : number;

	constructor($nombre: string, $puntos: number) {
		this.nombre = $nombre;
		this.puntos = $puntos;
	}
}