import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  constructor(private http: HttpClient) {}

  obtenerMaterias(listaMaterias: string[]): Observable<any> {
    return this.http.post('api/materia/obtener', listaMaterias );
  }

  generarHorario(listaMaterias: string[]): Observable<any> {
    return this.http.post('api/materia/horario', listaMaterias );
  }
}
