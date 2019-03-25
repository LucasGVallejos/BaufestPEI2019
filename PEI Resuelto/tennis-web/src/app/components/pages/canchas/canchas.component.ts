import { Component, OnInit } from '@angular/core';
import { Cancha } from '../../../models/cancha';
import { CanchaService } from '../../../services/cancha.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-canchas',
  templateUrl: './canchas.component.html',
  styleUrls: ['./canchas.component.css']
})
export class CanchasComponent implements OnInit {
  canchas: Array<Cancha>;

  constructor(private canchaService: CanchaService) {
  }

  ngOnInit() {
    this.loadCanchas();
  }

  loadCanchas() {
    this.canchaService.listCanchas()
      .subscribe((canchas: Cancha[]) => {
        this.canchas = canchas.map((cancha: Cancha) => {

          // Inicializa un objeto date al día de hoy sin la hora
          let hoy = new Date(Date.now()).setHours(0, 0, 0, 0);

          // Filtra el listado de partidos por los que coincidan con la fecha de hoy
          let partidosHoy = cancha.partidos.filter(
            partido => new Date(partido.fechaComienzo).setHours(0, 0, 0, 0) == hoy);

          // Setea la cantidad del listado filtrado
          cancha.partidosEnElDia = partidosHoy.length;

          return cancha;
        });
      });
  }

  removeCancha(id: number) {
    if (!confirm('¿Estás seguro?')) return;

    this.canchaService.removeCancha(id).subscribe((data) => this.loadCanchas());
  }

}
