import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroment/enviroment.development';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  constructor(private http: HttpClient) {}

  obtenerMaterias(listaIDMaterias: string[]): Observable<any> {
    return this.http.post(`${environment.api_host}/api/materia/obtener`, { materias: listaIDMaterias });
  }

  generarHorario(listaMaterias: any[]): Observable<any> {
    return this.http.post(`${environment.api_host}/api/materia/obtener`, listaMaterias );
  }
}
