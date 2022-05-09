import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class WebImssService {
  public token: string = "";

  constructor( public http: HttpClient, private router: Router ) { }

  HttpPost(modelo: any, servicio: string): Observable<any> {
    return this.http.post<any>(servicio, JSON.stringify(modelo), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      })
    })
    .pipe(
      map((resultado) => resultado)
    );
  }

  HttpGet(servicio: string): Observable<any> {
    return this.http.get<any>(servicio, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      })
    }).pipe(
      map((resultado) => resultado)
    );
  }

  HttpGetAsync(servicio: string): Observable<any> {
    return this.http.get(servicio, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      }),
    });
  }

  HttpPut(modelo: any, servicio: string): Observable<any> {
    return this.http.put<any>(servicio, JSON.stringify(modelo), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      }),
    })
    .pipe(
      map((resultado) => resultado)
    );
  }

  

  HttpUploadFiles(servicio: string, formData: FormData): Observable<HttpEvent<any>> {
    return this.http.post(servicio, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  public getAsync(url: string) {
    return new Promise((resolve, reject) => {
      this.HttpGet(url).subscribe(
        response => {
          resolve(response);
        }, err => {
          console.log(err.status)
          // si el error llega a ser un 401, intenramos generar otro token
          if(err.status == 401){
            //  this.refreshToken(url)
            //  this.router.navigate(['/login']);
          }else{
            resolve(null)
          }
          resolve(null)
        }
      );
    });
  }

  public postAsync(modelo: any, url: string) {
    return new Promise((resolve, reject) => {
      this.HttpPost(modelo, url).subscribe(
        response => {
          resolve(response);
        }, err => {
          resolve(null);
        }
      );
    });
  }

  public putAsync(modelo: any, url: string) {
    return new Promise((resolve, reject) => {
      this.HttpPut(modelo, url).subscribe(
        response => {
          resolve(response);
        }, err => {
          resolve(null);
        }
      );
    });
  }




  public async refreshToken(url: string){
    if(sessionStorage.getItem('usuario') != null){
     
      let usuario = JSON.parse(sessionStorage.getItem('usuario') || '');
      console.log(usuario)
      //  await this.getAsync(url);
    }
    
    
  }

  upload(file: File, url: string): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();
    formData.append('files', file);
   
    const req = new HttpRequest('POST', url, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  public enviarArchivo(url: string, archivo: File){
    let form = new FormData();
    form.append('files', archivo)
    this.http.post(url, form).subscribe(
      data => console.log(data),
      err => console.log(err),
      () => console.log("peticion realizada")
    )

  }

}
