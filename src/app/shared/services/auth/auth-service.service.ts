import { Injectable } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceShared {

  //Usamos rxjs para manejar los roles globalmente
  private rolesSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  roles$: Observable<string[]> = this.rolesSubject.asObservable();

  // Estado global para permisos
  private permissionsSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  permissions$: Observable<string[]> = this.permissionsSubject.asObservable();
  
  constructor() { }

   // Funciones para setear y listar roles
   setRoles(roles: string[]): void {
    this.rolesSubject.next(roles);
  }

  getRoles(): string[] {
    return this.rolesSubject.getValue();
  }

  // Funciones para setear y listar permisos
  setPermissions(permissions: string[]): void {
    this.permissionsSubject.next(permissions);
  }

  getPermissions(): string[] {
    return this.permissionsSubject.getValue();
  }

  // Verifica si el usuario tiene un rol específico
  hasRole(role: string): boolean {
    return this.getRoles().includes(role);
  }

  // Verifica si el usuario tiene un permiso específico
  hasPermission(permission: string): boolean {
    return this.getPermissions().includes(permission);
  }

   // Elimina todos los roles
   deleteRoles(): void {
    this.rolesSubject.next([]); // Vacía el array de roles
  }

  // Elimina todos los permisos
  deletePermissions(): void {
    this.permissionsSubject.next([]); // Vacía el array de permisos
  }

  clearRolesAndPermissions(){
    this.deleteRoles()
    this.deletePermissions()
  }

  navigationExtrasWithRoleAndPermission():NavigationExtras{
    const navigationExtras: NavigationExtras = {
      state: {
        data: [
          this.getRoles(),
          this.getPermissions()
        ]
      }
    }; 
    return navigationExtras
  }

}
