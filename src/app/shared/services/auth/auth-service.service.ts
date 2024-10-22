import { Injectable } from '@angular/core';
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

   // Métodos para manejar roles
   setRoles(roles: string[]): void {
    this.rolesSubject.next(roles);
  }

  getRoles(): string[] {
    return this.rolesSubject.getValue();
  }

  // Métodos para manejar permisos
  setPermissions(permissions: string[]): void {
    this.permissionsSubject.next(permissions);
  }

  getPermissions(): string[] {
    return this.permissionsSubject.getValue();
  }

  // Verificar si el usuario tiene un rol específico
  hasRole(role: string): boolean {
    return this.getRoles().includes(role);
  }

  // Verificar si el usuario tiene un permiso específico
  hasPermission(permission: string): boolean {
    return this.getPermissions().includes(permission);
  }
}
