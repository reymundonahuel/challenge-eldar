import { Injectable } from '@angular/core';
import { localStorageDS } from '../../../core/constants/env.constants';
import { Encriptar } from '../../../core/utils/encriptation.utils';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  //Este service lo hice para estandarizar los nombres y variables que se van a guardar en el local storage
  
  //Obtiene el storage mediante llave
  getStorageByKey(key:string){
    return localStorage.getItem(`${localStorageDS}-${key}`)
  }

  setStorageProperty(key:string,value:any){
    try {
      let data;      
    if (typeof value == "string") {
      data = value;
    }else if(typeof value == "object"){
      data = JSON.stringify(value);
    }else if(Array.isArray(value)){
      data = JSON.stringify(value);
    }else if(typeof value == "number" || typeof value == "bigint"){
      data = value;
    }else{
      data = value;
    }
    localStorage.setItem(`${localStorageDS}-${key}`,Encriptar(data))
    } catch (error) {
    }
  }

  deleteStorageByKey(key:string){
    localStorage.removeItem(`${localStorageDS}-${key}`)
  }

  clearStorage(){
    localStorage.clear()
  }
}
