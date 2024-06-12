import { Component } from '@angular/core';
import { DatosCompartidosService } from '../../services/datos-compartidos.service';


@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  materiasAMostrar: any;

  constructor(private datosCompartidosService: DatosCompartidosService) {}

  ngOnInit() {
    this.datosCompartidosService.selectedOptions$.subscribe(materiasInfo => {
      this.materiasAMostrar = materiasInfo;
    });
  }
}
