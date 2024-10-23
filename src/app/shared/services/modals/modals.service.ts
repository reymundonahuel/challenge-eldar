import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ModalStatus, ModalTypes } from '../../../core/types/modal.type';
import { TiposModalEnum } from '../../../core/enums/tiposModal.enum';

interface ModalInterface {
  name: string;
  status: ModalStatus;
  data: any;
  tipo:ModalTypes
}

@Injectable({
  providedIn: 'root',
})
export class ModalsService {
  
  //Creamos mediante observables y behaviorSubjects un servicio para manejar estados del modal de otros componentes
  private modalSubject: BehaviorSubject<ModalInterface> = new BehaviorSubject<ModalInterface>({
    name: '', // Nombre vacío por defecto
    status: "close", // Estado cerrado por defecto
    data: null, // Data vacía
    tipo: TiposModalEnum.CREAR //
  });

  modal$: Observable<ModalInterface> = this.modalSubject.asObservable();

  constructor() {}

  
  setModalStatus(name: string, status: ModalStatus, data: any,tipo:ModalTypes): void {
    this.modalSubject.next({ name, status, data,tipo });
  }

  
  getModalStatus(): ModalInterface {
    return this.modalSubject.getValue();
  }
}
