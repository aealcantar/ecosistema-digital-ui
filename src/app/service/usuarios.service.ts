import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  baseApiUrl = "http://localhost:8080/api/";
  // header = new HttpHeaders()
	// 		.set('Content-Type', 'aplication/json')
  //     .set('Access-Control-Allow-Origin', '*');

  header = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Authorization': 'Bearer szdp79a2kz4wh4frjzuqu4sz6qeth8m3',
  });

  constructor(private http:HttpClient) { }

  getUsuarios(busqueda: string):Observable<any>{
    let direccion = this.baseApiUrl + 'listarEmpleados';
    if(busqueda != ""){
      direccion = this.baseApiUrl + 'buscarEmpleado/' + busqueda;
    }

		return this.http.get(direccion,{headers: this.header});
  }

  consultaUsuario(id: number):Observable<any>{
    let direccion = this.baseApiUrl + 'consultarEmpleado/' + id;

    return this.http.get(direccion,{headers: this.header});
  }

  guardaUsuario(data: object):Observable<any>{
    let direccion = this.baseApiUrl + 'registrarEmpleado';

    return this.http.post(direccion, data, {headers: this.header});
  }

  actualizaUsuario(id: number,data: object):Observable<any>{
    let direccion = this.baseApiUrl + 'actualizarEmpleado/' + id;

    return this.http.put(direccion, data, {headers: this.header});
  }

  getRoles():Observable<any>{
    let direccion = this.baseApiUrl + 'listarRoles';
		return this.http.get(direccion,{headers: this.header});
  }



}
