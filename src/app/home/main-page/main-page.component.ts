import { Component } from '@angular/core';
import { DatosCompartidosService } from '../../services/datos-compartidos.service';
import { MateriasService } from '../../services/materias.service';
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

  constructor(private datosCompartidosService: DatosCompartidosService, private MateriasService: MateriasService) { }

  ngOnInit() {
    this.datosCompartidosService.selectedOptions$.subscribe(materiasInfo => {
      this.materiasAMostrar = materiasInfo;
      this.materiasAMostrar.forEach((materia: any) => {
        materia.cursos.forEach((curso: any) => {
          curso.opcion = 0;
        });
      });
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
      return 'grey';
    }
  }

  horarioComodo(horarios: any) {
    const groupedSchedule: { [key: string]: string[] } = {};

    horarios.forEach((entry: any) => {
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

  sumarUnaHora(hora: string) {
    let nuevaHora = 0
    if (hora[1] != '9') {
      nuevaHora = parseInt(hora[1]) + 1
      return hora[0] + nuevaHora.toString() + hora[2] + hora[3] + hora[4]
    }
    else {
      nuevaHora = parseInt(hora[0]) + 1
      return nuevaHora.toString() + '0' + hora[2] + hora[3] + hora[4]
    }
  }

  generarHorario() {
    let materiasAMandar = JSON.parse(JSON.stringify(this.materiasAMostrar));
    let cursosSiOSi: any[] = [];
    let cursosPosibles: any[] = [];
    let indice = -1
    materiasAMandar.forEach((materia: any) => {

      cursosSiOSi = []
      cursosPosibles = []
      indice++

      materia.cursos.forEach((curso: any) => {
        if (curso.opcion == 1) {
          cursosSiOSi.push(curso)
        }
        else if (curso.opcion == 0) {
          cursosPosibles.push(curso)
        }

        delete curso['difficulty'];
        delete curso['opcion'];
      });

      if (cursosSiOSi.length > 0) {
        materia.cursos = cursosSiOSi
      }
      else if (cursosPosibles.length > 0) {
        materia.cursos = cursosPosibles
      }
      else {
        materiasAMandar.splice(indice, 1)
      }
    });

    if (materiasAMandar.length > 0){
      console.log(materiasAMandar)
      this.MateriasService.generarHorario(materiasAMandar).subscribe(horario => {
        console.log(horario);
      });
    }
  }

  cambiarBoton(curso: any) {
    if (curso.opcion === 0) {
      curso.opcion = 1;
    } else if (curso.opcion === 1) {
      curso.opcion = 2;
    } else if (curso.opcion === 2) {
      curso.opcion = 0;
    }
  }
}
