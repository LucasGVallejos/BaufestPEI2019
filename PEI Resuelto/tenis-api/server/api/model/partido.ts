import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne} from "typeorm";

import { Jugador } from './jugador';
import { Cancha } from "./cancha";
import { Estados } from '../dtos/estados.enum';

@Entity()
export class Partido {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fechaComienzo: Date;

    @Column('varchar')
    estado: Estados;

    @ManyToOne(type => Jugador, { nullable: false, eager: true })
    @JoinColumn()
    jugadorLocal: Jugador;

    @ManyToOne(type => Jugador, { nullable: false, eager: true })
    @JoinColumn()
    jugadorVisitante: Jugador;

    @Column({ nullable: true, default: 0 })
    scoreLocal: number = 0;

    @Column({ nullable: true, default: "0" })
    puntosGameActualLocal: string = "0";

    @Column({ nullable: true, default: 0 })
    cantidadGamesLocal: number = 0;

    @Column({ nullable: true, default: 0 })
    scoreVisitante: number = 0;

    @Column({ nullable: true, default: "0" })
    puntosGameActualVisitante: string = "0";

    @Column({ nullable: true, default: 0 })
    cantidadGamesVisitante: number = 0;

    @ManyToOne(type => Cancha, { nullable: false, eager: true })
    @JoinColumn()
    cancha: Cancha;

}
