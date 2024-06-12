import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosCompartidosService {
  private selectedOptionsSubject = new Subject<any[]>();

  selectedOptions$ = this.selectedOptionsSubject.asObservable();

  actualizarMaterias(materiasInfo: any) {
    this.selectedOptionsSubject.next(materiasInfo);
  }
  constructor() { }
}
