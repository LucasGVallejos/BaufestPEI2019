import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Partido } from "./partido";

@Entity()
export class Cancha {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    direccion: string;

    @OneToMany(type => Partido, partido => partido.cancha)
    partidos: Partido[];

    constructor($nombre: string, $direccion: string) {
        this.nombre = $nombre;
        this.direccion = $direccion;
    }
}