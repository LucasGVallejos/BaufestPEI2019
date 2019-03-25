import { Component, OnInit } from '@angular/core';
import { Partido } from '../../../models/partido';
import { Estados } from '../../../models/estados'
import { PartidoService } from '../../../services/partido.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.component.html',
  styleUrls: ['./partidos.component.css']
})
export class PartidosComponent implements OnInit {

  partidos: Partido[];
  estados = Estados;
  mensajeError: string;

  constructor(
    private router: Router,
    private partidoService: PartidoService) {
  }

  ngOnInit() {
    this.loadPartidos();
  }

  loadPartidos() {
    this.partidoService.listPartidos().subscribe(
      (partidos: Partido[]) => this.partidos = partidos,
      (error: any) => this.mensajeError = error.message);
  }

  removePartido(id: number) {
    if (!confirm('¿Estás seguro?')) return;

    this.partidoService.removePartido(id).subscribe(
      () => this.loadPartidos(),
      (error: any) => this.mensajeError = error.message);
  }

  iniciarPartido(id: number) {
    this.partidoService.iniciarPartido(id).subscribe(
      () => this.router.navigate(['/partidos', 'tablero', id]),
      (error: any) => this.mensajeError = error.message);
  }

}
