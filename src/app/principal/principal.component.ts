import { Component, OnInit } from '@angular/core';
import { objAlert } from '../common/alerta/alerta.interface';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  alert!: objAlert;
  constructor() { }

  ngOnInit(): void {
    //window.location.href = 'http://localhost:53673/buscauser'
    this.showSucces(" Bienvenido !")
  }

  private showError(error:string) {

    this.alert = {
      message:error,
      type: 'error',
      visible: true
    }
    setTimeout(() => {
      this.alert = {
        message:'',
        type: 'custom',
        visible: false
      }
    }, 5000);
  }
  //success

  private showSucces(msg:string) {

    this.alert = {
      message:'<strong>Estatus.</strong>'+msg,
      type: 'success',
      visible: true
    }
    setTimeout(() => {
      this.alert = {
        message:'',
        type: 'custom',
        visible: false
      }
    }, 2000);
  }
}
