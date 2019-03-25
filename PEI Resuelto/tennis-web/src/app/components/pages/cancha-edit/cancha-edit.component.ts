import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cancha } from '../../../models/cancha';
import { CanchaService } from '../../../services/cancha.service';

@Component({
  selector: 'app-cancha-edit',
  templateUrl: './cancha-edit.component.html',
  styleUrls: ['./cancha-edit.component.css']
})
export class CanchaEditComponent implements OnInit {

  model: Cancha = new Cancha();
  mensajeError: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private canchaService: CanchaService) {
  }

  editCancha() {
    this.canchaService.editCancha(this.model).subscribe(
      data => this.router.navigate(['/canchas'], { relativeTo: this.activatedRoute }),
      error => this.mensajeError = error.message);
  }

  cancelar() {
    this.router.navigate(['/canchas'], { relativeTo: this.activatedRoute });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(p => {
      if (!p['id']) throw new Error('Falta el parametro id');

      this.canchaService.getCancha(p['id']).subscribe(
        (cancha: Cancha) => this.model = cancha);
    });
  }

}
