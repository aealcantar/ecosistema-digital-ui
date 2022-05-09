import { Subject,Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { LoginData } from './login/login-data.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';



@Injectable()
export class SeguridadService {
  seguridadCambio = new Subject<boolean>();
  private usuario!: Usuario;


  constructor(private router: Router,private http: HttpClient){

  }

  registrarUsuario(usr: Usuario) {
    this.usuario = {
      strEmail: usr.strEmail,
     // usuarioid: Math.round(Math.random() * 10000).toString(),
     strNombres: usr.strNombres,
     strApellidoP: usr.strApellidoP,
     strApellidoM: usr.strApellidoM,
     strUserName: usr.strUserName,
     strPassword: usr.strPassword
    };

    this.seguridadCambio.next(true);
    this.router.navigate(['/login']);
  }

  login(loginData: LoginData) {
    /*this.usuario = {
      strEmail:'',
     // usuarioid: Math.round(Math.random() * 10000).toString(),
      nombre: '',
      apellidos: '',
      username: '',
      password: ''
    };*/
    this.seguridadCambio.next(true);
    this.router.navigate(['/principal']);
  }

  salirSesion() {
    /*
    this.usuario = {
      strEmail: '',
      usuarioid: '',
      nombre: '',
      apellidos: '',
      username: '',
      password: ''
    };*/
    this.seguridadCambio.next(false);
    this.router.navigate(['/login']);
  }

  obtenerUsuario() {
    return { ...this.usuario };
  }

  onSession(){
    return this.usuario != undefined;
  }
}
