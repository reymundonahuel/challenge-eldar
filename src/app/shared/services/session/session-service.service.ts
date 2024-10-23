import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { localStorageDS } from '../../../core/constants/env.constants';
import { LocalStorageKeyEnum } from '../../../core/enums/localstorageKeys.enum';
import { Desencriptar } from '../../../core/utils/encriptation.utils';
import { CuentaInterface } from '../../../core/interfaces/login.interfaces';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  //Este servicio nos va a ayudar a obtener el token, roles, etc. Desde local storage

  constructor(
    private localstorageService:StorageService,
  ) { }

  //Header para enviar token - Simulacion
  public get baseHeadersLogged(){
    return {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
  }

  //Header para hacer peticiones sin token
  public get baseHeadersPublic(){
    return {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
  }

  //Guarda token
  setToken(token:string){
    this.localstorageService.setStorageProperty(LocalStorageKeyEnum.TOKEN,token)
  }

  //Obtiene token
  getToken(){
    try {
    let token = this.localstorageService.getStorageByKey(LocalStorageKeyEnum.TOKEN) != null ? Desencriptar(this.localstorageService.getStorageByKey(LocalStorageKeyEnum.TOKEN)) : null
     return token
    } catch (error) {
      return null
    }
  }

  //Elimina el token
  removeToken(){
    this.localstorageService.deleteStorageByKey(LocalStorageKeyEnum.TOKEN)
  }

  //Guarda el perfil del usuario (token y rol)
  setUserProfile(profile:CuentaInterface){
    this.localstorageService.setStorageProperty(LocalStorageKeyEnum.USER,profile)
  }

  //Obtiene el perfil del usuario
  getUserProfile():CuentaInterface{
    let getData = this.localstorageService.getStorageByKey(LocalStorageKeyEnum.USER)
    let desencrypted = Desencriptar(getData)
    let parsed = JSON.parse(desencrypted)
    return parsed
  }

  //Elimina el perfil del usuario
  deleteUserProfile(){
    this.localstorageService.deleteStorageByKey(LocalStorageKeyEnum.USER)
  }

  //Vacia el localstorage
  clearLocalStorageData(){
    this.localstorageService.clearStorage()
  }

}
