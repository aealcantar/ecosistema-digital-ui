import { Component, Input, OnInit } from '@angular/core';
import { NgbAlert, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { objAlert } from './alerta.interface';

// interface objAlert {
//   type: string;
//   message: string;
//   visible: boolean;
// }

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.css']
})
export class AlertaComponent implements OnInit {
  @Input() objAlerta!: objAlert;

  constructor() { }

  ngOnInit(): void {
  }

}
