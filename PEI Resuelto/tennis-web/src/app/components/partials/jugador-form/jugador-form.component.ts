import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Jugador } from 'src/app/models/jugador';
import { JugadorService } from 'src/app/services/jugador.service';

@Component({
  selector: 'app-jugador-form',
  templateUrl: './jugador-form.component.html',
  styleUrls: ['./jugador-form.component.css']
})
export class JugadorFormComponent implements OnInit {

  @Input() model: Jugador;
  @Input() isEdit: boolean;
  @Input() mensajeError: string;
  
  @Output() onSubmit = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  
  title: string;
  btnSubmitText: string;

  constructor(
    private jugadorService: JugadorService) {
  }

  ngOnInit(): void {
    this.title = !this.isEdit ? 'Agregar Jugador' : 'Editar Jugador';
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
