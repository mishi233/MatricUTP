import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { MATERIA } from '../../../models/materias';
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
    let selectedOptionsID: string[] = [];
    if (this.selectedOptions != null) {
      this.selectedOptions.forEach(option => {
        selectedOptionsID.push(this.getIDFromValue(option));
      });
    }       
    if (selectedOptionsID.length > 0){
      this.materiaService.obtenerMaterias(selectedOptionsID).subscribe(informationMateria => {
        this.datosCompartidosService.actualizarMaterias(informationMateria.results);
        console.log(informationMateria.results)
      }, error => {
        console.error('Error al cargar la información de los libros', error);
      });
    }
    else{
      this.datosCompartidosService.actualizarMaterias([]);
    }
  }

  getIDFromValue(value: string): string {
    const materia = MATERIA.find(m => m.value === value);
    return materia ? materia.id : 'ID no encontrado';
  }
}