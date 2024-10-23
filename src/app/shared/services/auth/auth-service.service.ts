import { Injectable } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceShared {

 // Usamos rxjs para manejar los roles globalmente
 private rolesSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(this.loadRolesFromLocalStorage());
 roles$: Observable<string[]> = this.rolesSubject.asObservable();

 // Estado global para permisos
 private permissionsSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(this.loadPermissionsFromLocalStorage());
 permissions$: Observable<string[]> = this.permissionsSubject.asObservable();

 constructor() {
   this.loadRolesFromLocalStorage();
   this.loadPermissionsFromLocalStorage();
 }

 // Funciones para setear y listar roles
 setRoles(roles: string[]): void {
   this.rolesSubject.next(roles);
   localStorage.setItem('roles', JSON.stringify(roles)); // Guardar en localStorage
 }

 getRoles(): string[] {
   return this.rolesSubject.getValue();
 }

 // Funciones para setear y listar permisos
 setPermissions(permissions: string[]): void {
   this.permissionsSubject.next(permissions);
   localStorage.setItem('permissions', JSON.stringify(permissions)); // Guardar en localStorage
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
   localStorage.removeItem('roles'); // Eliminar de localStorage
 }

 // Elimina todos los permisos
 deletePermissions(): void {
   this.permissionsSubject.next([]); // Vacía el array de permisos
   localStorage.removeItem('permissions'); // Eliminar de localStorage
 }

 clearRolesAndPermissions(): void {
   this.deleteRoles();
   this.deletePermissions();
 }

 // Recuperar los roles desde localStorage
 private loadRolesFromLocalStorage(): string[] {
   const roles = localStorage.getItem('roles');
   return roles ? JSON.parse(roles) : [];
 }

 // Recuperar los permisos desde localStorage
 private loadPermissionsFromLocalStorage(): string[] {
   const permissions = localStorage.getItem('permissions');
   return permissions ? JSON.parse(permissions) : [];
 }

 navigationExtrasWithRoleAndPermission(): NavigationExtras {
   const navigationExtras: NavigationExtras = {
     state: {
       data: [this.getRoles(), this.getPermissions()],
     },
   };
   return navigationExtras;
 }

}
