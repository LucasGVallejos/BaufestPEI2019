import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cancha } from '../../../models/cancha';
import { CanchaService } from '../../../services/cancha.service';

@Component({
  selector: 'app-cancha-add',
  templateUrl: './cancha-add.component.html',
  styleUrls: ['./cancha-add.component.css']
})
export class CanchaAddComponent implements OnInit {

  public model: Cancha = new Cancha();
  public mensajeError: string;

  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private canchaService: CanchaService) {
  }

  addCancha() {
    this.canchaService.addCancha(this.model).subscribe(
      data => this.router.navigate(['/canchas'], { relativeTo: this.activatedRoute }),
      error => this.mensajeError = error.message);
  }

  cancelar() {
    this.router.navigate(['/canchas'], { relativeTo: this.activatedRoute });
  }

  ngOnInit() {
  }

}
