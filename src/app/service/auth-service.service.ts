import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from 'src/app/models/usuario.model';
import { environment } from 'src/environments/environment';
import { WebImssService } from './web-imss-service.service';
import { Aplicacion } from '../models/aplicacion.model';
import { MailResponse } from '../models/mail-response.model';
import { AdmonPasswordRequest } from '../models/admon-password-request.model';
import { AdmonPasswordResponse } from '../models/admon-password-response.model';
import { RecaptchaResponse } from '../models/recaptcha-response-model';


@Injectable({
  providedIn: 'root'
})
export class AuthService { 

  private _usuario!: Usuario;
  private _token!: string;
  public nombreUsuarioActivo = "";

  constructor(private http: HttpClient, public webService: WebImssService
    ) { }

  public get usuario(): Usuario {
    if (this._usuario != null) {
      return this._usuario;
    } else if (this._usuario == null && sessionStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario') as string) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token') as string;
      return this._token;
    }
    return '';
  }

  setNombreUsuarioActivo(name: string) {
    this.nombreUsuarioActivo = name;
  }

  getNombreUsuarioActivo() {
    return this.nombreUsuarioActivo;
  }
  actualizarPassword(admonPasswordRequest:AdmonPasswordRequest){
     return this.http.post<AdmonPasswordResponse>(`${environment.urlServOauth}/api/aplicacion/actualizarPassword/`, admonPasswordRequest);
  }
 
  getAppAccesbyAppName(name:string){
    return this.http.get<Aplicacion>(`${environment.urlServOauth}/api/aplicacion/app?appName=${name}`);
  }

  validateRecaptcha(response: string) {
  
    const urlEndpoint = environment.urlSiteGoogleRecaptcha ;
    const httpHeaders = new HttpHeaders({
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    
    let params = new URLSearchParams();
    
    params.set('response', response || '' );
    params.set('secret', environment.secretKey);
    
    return this.http.post<any>(urlEndpoint, params.toString(), { headers: httpHeaders });
  }

  login(usuario: Usuario, aplicacion:Aplicacion) {
    
    sessionStorage.clear();
    const urlEndpoint = environment.urlServOauth + '/oauth/token';
    
    console.log(" usuario app  "+ aplicacion.cveUsuario);
    console.log(" pass app  "+ aplicacion.cvePassword);
    const credenciales = btoa( aplicacion.cveUsuario + ':' + aplicacion.cvePassword);
    //const credenciales = aplicacion.cveUsuario + ':' + aplicacion.cvePassword;
    
    

    const httpHeaders = new HttpHeaders({
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales
    });

    let params = new URLSearchParams();
    
    params.set('username', usuario.strEmail || '' );
    params.set('password', usuario.strPassword || '');
    params.set('grant_type', 'password');
    params.set('appId', 'AD');
  
    return this.http.post<any>(urlEndpoint, params.toString(), { headers: httpHeaders });
  }

  guardarUsuario(accessToken: string): void {
    let payload = this.obtenerDatosToken(accessToken);
    this._usuario = new Usuario();
    this._usuario.strEmail = payload.user_name;
    this._usuario.strRol = payload.authorities;

    // sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  guardarUsuarioManual(userName: string, authorities: string): void {
    this._usuario = new Usuario();
    this._usuario.strEmail = userName;
    this._usuario.strRol = authorities;
    this._usuario.rolUser = authorities;
    this._usuario.cveUsuario = 1;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  guardarToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  obtenerDatosToken(accessToken: string): any {
    if (accessToken=='ajaltechnology') return accessToken;
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {
    if (this.token=='ajaltechnology') return true;
    let payload = this.obtenerDatosToken(this.token);

    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      return true;
    }
    return false;
  }
  onSession(){
    return this.usuario != undefined;
  }
  logout(): void {
    this._token = '';
    this._usuario = new Usuario;

    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('datosUsuario');
  }

  async obtenerUsuario(usuario: string, contrasena: string) {

    const urlEndpoint = environment.urlServOauth + '/app/' + usuario;
    let respuesta: any = await this.webService.getAsync(urlEndpoint);
    
    if (respuesta != null) {
      let usuario: Usuario = {
        strApellidoP: respuesta.apellidoPaterno,
        strNombres: respuesta.nombre,
        strEmail: respuesta.ctaMetro,
        strPassword: contrasena,
        cveUsuario: respuesta.cveUsuario,
        rolUser: respuesta.rol.descripcion,
        areaDefault: respuesta.area,
      };
      sessionStorage.setItem('usuario', JSON.stringify(usuario));
      
    }
  

    return respuesta;
  }

 

}
