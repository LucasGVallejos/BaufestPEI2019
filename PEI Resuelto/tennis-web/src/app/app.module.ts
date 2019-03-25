import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RestangularModule, Restangular } from 'ngx-restangular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JugadoresComponent } from './components/pages/jugadores/jugadores.component';
import { JugadorAddComponent } from './components/pages/jugador-add/jugador-add.component';
import { JugadorEditComponent } from './components/pages/jugador-edit/jugador-edit.component';
import { PartidosComponent } from './components/pages/partidos/partidos.component';
import { PartidoAddComponent } from './components/pages/partido-add/partido-add.component';
import { PartidoEditComponent } from './components/pages/partido-edit/partido-edit.component';
import { TableroComponent } from './components/pages/tablero/tablero.component';

import { PartidoFormComponent } from './components/partials/partido-form/partido-form.component';
import { JugadorFormComponent } from './components/partials/jugador-form/jugador-form.component';

import { RestangularConfigFactory } from 'src/app/restangularConfig';
import { CanchasComponent } from './components/pages/canchas/canchas.component';
import { CanchaFormComponent } from './components/partials/cancha-form/cancha-form.component';
import { CanchaAddComponent } from './components/pages/cancha-add/cancha-add.component';
import { CanchaEditComponent } from './components/pages/cancha-edit/cancha-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    JugadoresComponent,
    JugadorAddComponent,
    JugadorEditComponent,
    PartidosComponent,
    PartidoAddComponent,
    PartidoEditComponent,
    TableroComponent,
    JugadorFormComponent,
    PartidoFormComponent,
    CanchasComponent,
    CanchaFormComponent,
    CanchaAddComponent,
    CanchaEditComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RestangularModule.forRoot([], RestangularConfigFactory),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
