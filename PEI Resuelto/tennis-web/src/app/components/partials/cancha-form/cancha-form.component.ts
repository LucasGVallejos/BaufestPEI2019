import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Cancha } from 'src/app/models/cancha';
import { CanchaService } from 'src/app/services/cancha.service';

@Component({
  selector: 'app-cancha-form',
  templateUrl: './cancha-form.component.html',
  styleUrls: ['./cancha-form.component.css']
})
export class CanchaFormComponent implements OnInit {

  @Input() public model: Cancha;
  @Input() public isEdit: boolean;
  @Input() public mensajeError: string;
  
  @Output() public onSubmit = new EventEmitter();
  @Output() public onCancel = new EventEmitter();
  
  title: string;
  btnSubmitText: string;

  constructor(
    private canchaService: CanchaService) {
  }

  ngOnInit(): void {
    this.title = !this.isEdit ? 'Agregar Cancha' : 'Editar Cancha';
    this.btnSubmitText = !this.isEdit ? 'Agregar' : 'Editar';
  }

  submitForm() {
    this.onSubmit.emit();
  }

  cancelar() {
    this.onCancel.emit();
  }

  isValid(control: any): boolean {
    return control.valid || control.pristine;
  }

}
