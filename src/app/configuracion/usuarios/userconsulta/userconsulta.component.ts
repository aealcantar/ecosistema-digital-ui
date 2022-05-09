import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { objAlert } from '../../../common/alerta/alerta.interface';
import { AlertaComponent } from '../../../common/alerta/alerta.component';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { KeyValue } from '@angular/common';
import { UsuariosService } from 'src/app/service/usuarios.service';

declare var $: any;

interface Usuarios {
  matricula: string,
  nombre: string,
  rolsistema: string,
  rolinstituto: string
}

@Component({
  selector: 'app-userconsulta',
  templateUrl: './userconsulta.component.html',
  styleUrls: ['./userconsulta.component.css']
})
export class UserconsultaComponent implements OnInit {
  alert!: objAlert;
  varid!: any;
  lstUsuarios!: Usuarios[];

  objectKeys = Object.keys;
  items = {
    'Matrícula': '', 'Usuario': '', 'Contraseña': '',
    'Nombre(s)': '', 'Primer apellido': '', 'Segundo apellido': '',
    'Correo electrónico': '', 'Unidad médica': '',
    'Rol': '', 'Estatus': '', 'Puesto': '',
    'Escuela de procedencia': ''
  };

  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  }

  public keepOriginalOrder = (a: { key: any; }, b: any) => a.key;

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient, private router: Router,
    private activerouter: ActivatedRoute,
    private userservice: UsuariosService) { }



  ngOnInit(): void {
    this.varid = this.activerouter.snapshot.paramMap.get('id');
    this.buscarusuario(this.varid);
  }

  limpiarbusqueda() {

  }

  buscarusuario(id: number) {
    this.userservice.consultaUsuario(id).subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.items.Matrícula = resp.matricula;
        this.items.Usuario = resp.usuario;
        this.items.Contraseña = resp.des_password;
        this.items['Nombre(s)'] = resp.nom_nombre;
        this.items['Primer apellido'] = resp.nom_primer_apellido;
        this.items['Segundo apellido'] = resp.nom_segundo_apellido;
        this.items['Correo electrónico'] = resp.email;
        this.items['Unidad médica'] = resp.des_unidad_medica;
        this.items.Rol = resp.adtc_roles.des_rol;
        this.items.Estatus = resp.ind_estatus ? 'Activo' : 'Inactivo';
        this.items.Puesto = resp.des_puesto;
        this.items['Escuela de procedencia'] = resp.des_escuela_procedencia;
      },
      error: (err: { error: { message: { toString: () => string; }; }; }) => {
        this.muestraAlerta('<strong>Error.</strong> ' + err.error.message.toString(), 'alert-danger');
      }
    })
  }

  editarusuario() {
    if (this.items.Matrícula != '') {
      this.router.navigate(['/editauser/' + this.varid]);
    }
  }

  regresaconsulta() {
    this.router.navigate(['/buscauser/']);
  }

  muestraAlerta(mensaje: string, estilo: string) {
    this.alert = {
      message: mensaje,
      type: estilo,
      visible: true
    }
    setTimeout(() => {
      this.alert = {
        message: '',
        type: 'custom',
        visible: false
      }
    }, 2000);
  }

}