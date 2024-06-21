import { Component } from '@angular/core';
import { DatosCompartidosService } from '../../services/datos-compartidos.service';
import { CommonModule } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, ProgressBarModule],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  materiasAMostrar: any;

  constructor(private datosCompartidosService: DatosCompartidosService) { }

  ngOnInit() {
    this.datosCompartidosService.selectedOptions$.subscribe(materiasInfo => {
      this.materiasAMostrar = materiasInfo;
    });
  }

  getColorClass(difficulty: number): string {
    if (difficulty >= 0 && difficulty < 1) {
      return 'green';
    } else if (difficulty >= 1 && difficulty < 2) {
      return 'lightgreen';
    } else if (difficulty >= 2 && difficulty < 3) {
      return 'yellow';
    } else if (difficulty >= 3 && difficulty < 4) {
      return 'orange';
    } else if (difficulty >= 4 && difficulty <= 5) {
      return 'red';
    } else {
      return 'grey'; // Clase por defecto si el valor está fuera del rango
    }
  }

  horarioComodo(horarios: any) {
    const groupedSchedule: { [key: string]: string[] } = {};

    horarios.forEach((entry:any) => {
      if (!groupedSchedule[entry.dayOfWeek]) {
        groupedSchedule[entry.dayOfWeek] = [];
      }
      groupedSchedule[entry.dayOfWeek].push(entry.hour);
    });

    let result = [];
    for (const day in groupedSchedule) {
      if (groupedSchedule.hasOwnProperty(day)) {
        const hours = groupedSchedule[day].sort();
        result.push(`${day} ${hours[0]} - ${this.sumarUnaHora(hours[1])}`);
      }
    }

    return result;
  }

  sumarUnaHora(hora: string){
    let nuevaHora = 0
    if (hora[1] != '9'){
      nuevaHora = parseInt(hora[1]) + 1
      return hora[0] + nuevaHora.toString() + hora[2] + hora[3] + hora[4]
    }
    else{
      nuevaHora = parseInt(hora[0]) + 1
      return nuevaHora.toString() + '0' + hora[2] + hora[3] + hora[4]
    }
  }
}
