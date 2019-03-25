import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JugadoresComponent } from './components/pages/jugadores/jugadores.component';
import { JugadorAddComponent } from './components/pages/jugador-add/jugador-add.component';
import { JugadorEditComponent } from './components/pages/jugador-edit/jugador-edit.component';
import { PartidosComponent } from './components/pages/partidos/partidos.component';
import { PartidoAddComponent } from './components/pages/partido-add/partido-add.component';
import { PartidoEditComponent } from './components/pages/partido-edit/partido-edit.component';
import { TableroComponent } from './components/pages/tablero/tablero.component';
import { CanchasComponent } from './components/pages/canchas/canchas.component';
import { CanchaAddComponent } from './components/pages/cancha-add/cancha-add.component';
import { CanchaEditComponent } from './components/pages/cancha-edit/cancha-edit.component';

const routes: Routes = [
  { path: 'jugadores', component: JugadoresComponent },
  { path: 'jugadores/add', component: JugadorAddComponent },
  { path: 'jugadores/edit/:id', component: JugadorEditComponent },
  { path: 'partidos', component: PartidosComponent },
  { path: 'partidos/add', component: PartidoAddComponent },
  { path: 'partidos/edit/:id', component: PartidoEditComponent },
  { path: 'partidos/tablero/:id', component: TableroComponent },
  { path: 'canchas', component: CanchasComponent },
  { path: 'canchas/add', component: CanchaAddComponent },
  { path: 'canchas/edit/:id', component: CanchaEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
