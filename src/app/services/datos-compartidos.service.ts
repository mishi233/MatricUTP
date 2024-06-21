import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosCompartidosService {
  private selectedOptionsSubject = new BehaviorSubject<any[]>([]);
  selectedOptions$ = this.selectedOptionsSubject.asObservable();

  actualizarMaterias(materiasInfo: any) {
    this.selectedOptionsSubject.next(materiasInfo);
  }

  constructor() { }
}
