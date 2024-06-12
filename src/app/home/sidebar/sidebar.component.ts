import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { MATERIA } from '../../models/materias';
import { DatosCompartidosService } from '../../services/datos-compartidos.service';
import { MateriasService } from '../../services/materias.service';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MultiSelectModule, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isSidebarHidden = false;
  options: any[] = MATERIA
  selectedOptions: any[] = [];  

  constructor(private datosCompartidosService: DatosCompartidosService, private materiaService: MateriasService) { }

  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }

  eliminarDeSeleccionados(materia: string){
    this.selectedOptions = this.selectedOptions.filter(item => item !== materia);
    this.actualizarMaterias()
  }

  actualizarMaterias(){
    this.materiaService.obtenerMaterias(this.selectedOptions)
      .subscribe(
        (materiasInfo) => {
          this.datosCompartidosService.actualizarMaterias(materiasInfo);},
        (error) => {
          console.error('Error al obtener materias:', error);
        }
      );
  }
}