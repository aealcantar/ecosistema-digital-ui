import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './seguridad/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SeguridadService } from './seguridad/seguridad.service';
import { HttpClientModule } from '@angular/common/http';
import { RegistroComponent } from './seguridad/registro/registro.component';
import { PrincipalComponent } from './principal/principal.component';
import { ConsultaComponent } from './configuracion/catalogos/consulta/consulta.component';
import { CargaComponent } from './configuracion/catalogos/carga/carga.component';
import { AlertaComponent } from './common/alerta/alerta.component';
import { UserconsultaComponent } from './configuracion/usuarios/userconsulta/userconsulta.component';
import { UserguardaComponent } from './configuracion/usuarios/userguarda/userguarda.component';
import { UserbuscaComponent } from './configuracion/usuarios/userbusca/userbusca.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { CatalogosService } from './configuracion/catalogos/catalogos.service';
import { UsuariosService } from './service/usuarios.service';

import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    PrincipalComponent,
    ConsultaComponent,
    CargaComponent,
    AlertaComponent,
    UserconsultaComponent,
    UserguardaComponent,
    UserbuscaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatIconModule,
    MatFormFieldModule,
    RecaptchaV3Module,
    DataTablesModule
  ],
  providers:
    [UsuariosService, CatalogosService, SeguridadService, {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.siteKey
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
