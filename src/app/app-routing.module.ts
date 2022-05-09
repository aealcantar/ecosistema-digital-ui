import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaComponent } from './configuracion/catalogos/consulta/consulta.component';
import { UserbuscaComponent } from './configuracion/usuarios/userbusca/userbusca.component';
import { UserconsultaComponent } from './configuracion/usuarios/userconsulta/userconsulta.component';
import { UserguardaComponent } from './configuracion/usuarios/userguarda/userguarda.component';
import { PrincipalComponent } from './principal/principal.component';
import { LoginComponent } from './seguridad/login/login.component';
import { RegistroComponent } from './seguridad/registro/registro.component';
import { SeguridadRouter } from './seguridad/seguridad.router';

const routes: Routes = [
  {path:'', component:PrincipalComponent, canActivate: [SeguridadRouter]},
  {path: 'login', component:LoginComponent},
  {path: 'recuperarpassword', component:RegistroComponent},
  {path: 'principal', component:PrincipalComponent, canActivate: [SeguridadRouter]},
  {path: 'consultacat', component:ConsultaComponent},
  {path: 'buscauser', component: UserbuscaComponent},
  {path: 'consultauser/:id', component: UserconsultaComponent},
  {path: 'guardauser', component: UserguardaComponent},
  {path: 'editaauser/:id', component: UserguardaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [SeguridadRouter]
})
export class AppRoutingModule { }
