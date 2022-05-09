import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbAlert, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { objAlert } from '../../../common/alerta/alerta.interface';
import { AlertaComponent } from '../../../common/alerta/alerta.component';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CatalogosService } from '../catalogos.service';

declare var $: any;


interface Catalogos {
  nombre: string,
  estatus: string,
  fechamodificacion: string
}

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  // archivodata = this.formBuilder.group({
  //   catalogo: ['', Validators.required]
  // });
  correosubmitted = false;
  alert!: objAlert;
  percentDone!: number;
  uploadSuccess!: boolean;
  file!: File[];
  shortLink: string = "";

  lstCatalogos!: Catalogos[];

  catalogosel = {
    nombre: ''
    , proceso: ''
    , errmsg: ''
    , nombrearchivo: ''
    , tamanioarchivo: ''
  };

  constructor(private formBuilder: FormBuilder, private modalService: NgbModal,
    private http: HttpClient, private catservice: CatalogosService) { }

  ngOnInit(): void {

    // setTimeout(() => {
    //   this.alert = {
    //     message: '<strong>Error.</strong> Ingresa los datos obligatorios',
    //     type: 'danger',
    //     visible: true
    //   };
    // }, 2000);
    this.lstCatalogos = [
      { nombre: 'Unidades médicas', estatus: '1', fechamodificacion: '14/02/2021' },
      { nombre: 'Servicios', estatus: '2', fechamodificacion: '-' },
      { nombre: 'Ubicaciones', estatus: '3', fechamodificacion: '14/02/2021' },
      { nombre: 'Responsables', estatus: '2', fechamodificacion: '-' },
      { nombre: 'Programas de Trabajo Social', estatus: '1', fechamodificacion: '14/02/2021' },
      { nombre: 'Configuración de Calendario Anual', estatus: '2', fechamodificacion: '-' },
      { nombre: 'Usuarios', estatus: '1', fechamodificacion: '14/02/2021' }
    ]


  }

  modalcarga(content: any, tipocatalogo: string) {
    this.catalogosel.nombre = tipocatalogo;
    this.catalogosel.proceso = 'inicio';
    //this.modalService.open(content, {centered: true,size: 'lg', backdrop: 'static', keyboard: false})
    $('#content').modal({
      keyboard: false,
      backdrop: 'static'
    })
    $('#content').modal('show')
  }

  aceptarcarga() {

  }

  cancelarcarga() {

  }

  upload(event: any) {
    //this.file = event.target.files[0] || undefined;
    // let file2 = (<HTMLInputElement>event.target) == null ? '' : (<HTMLInputElement>event.target).files;
    // let file3: File[];
    // file3 = file2[0];
    // this.uploadAndProgressSingle2(file2[0]);

    // event.target.files.length == 1 ? this.imageName = event.target.files[0].name : this.imageName = event.target.files.length + " archivos";
    // this.selectedFiles = event.target.files;

    //this.uploadAndProgressSingle2(event.target.files[0]);
    let archivo: File;
    archivo = event.target.files[0];
    if (archivo.size <= 20000) {
      this.onUpload(archivo);
    } else {
      this.catalogosel.errmsg = 'supera el máximo permitido.';
    }
  }

  uploadAndProgressSingle() {
    this.http.post('https://file.io', this.file, { reportProgress: true, observe: 'events' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / (event.total || this.file[0].size));
        } else if (event instanceof HttpResponse) {
          this.uploadSuccess = true;
        }
      });
  }

  uploadAndProgressSingle2(file2: File) {
    this.http.post('https://file.io', file2, { reportProgress: true, observe: 'events' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / (event.total || file2.size));
        } else if (event instanceof HttpResponse) {
          this.uploadSuccess = true;
        }
      });
  }

  onUpload(file2: File) {
    console.log(file2);
    this.catalogosel.proceso = 'progress';
    this.catalogosel.nombrearchivo = file2.name.toString();
    this.catalogosel.tamanioarchivo = file2.size.toString();
    this.catservice.upload(file2).subscribe(
      event => {
        // if (typeof (event) === 'object') {
        //     // Short link via api response
        //     this.shortLink = event.link;
        // }
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / file2.size);
        } else if (event instanceof HttpResponse) {
          this.uploadSuccess = true;

        }
        console.log(event);
      },
      err => {
        this.percentDone = 0;
        this.uploadSuccess = false;
        this.shortLink = 'No se puede subir el archivo ' + file2.name;
        this.catalogosel.errmsg = ' el formato es erróneo';
      }
    );

    this.catalogosel.proceso = 'result';
  }

  descargaacuse() {

  }

}