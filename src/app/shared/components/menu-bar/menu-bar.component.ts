import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { Router } from '@angular/router';
import { Routes_app, Routes_Auth } from '../../../core/constants/routes.constants';
import { AuthServiceShared } from '../../services/auth/auth-service.service';
import { RolesEnum } from '../../../core/enums/roles.enum';
import { ModalsService } from '../../services/modals/modals.service';
import { SessionService } from '../../services/session/session-service.service';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { selectRoles, selectPermissions } from '../../../core/store/auth/selectors/auth.selectors';

@Component({
  selector: 'app-menubar',
  standalone: true,
  imports: [
    MenubarModule,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    RippleModule,
    CommonModule,
  ],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.css'
})
export class MenuBarComponent {
  roles: Array<string> = [];
  permisos: Array<string> = [];
  itemsPosts: Array<any> = [];

  // Modals iniciales
  modalStatusOpen = {
    createPost: false,
    editPost: false
  };

  menuItems: Array<any> = [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      styleClass: 'blue-icon',
      command: () => {
        this.router.navigate([Routes_app.dashboard]);
      }
    },
    {
      label: 'Posts',
      icon: 'pi pi-file',
      styleClass: 'blue-icon',
      command: () => {
        this.router.navigate([Routes_app.posts]);
      },
      items: this.itemsPosts
    },
    {
      label: 'Cerrar sesión',
      icon: 'pi pi-times-circle',
      styleClass: 'red-icon',
      command: () => {
        this.logout();
      }
    },
  ];

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private store: Store // Inyectamos el Store de NgRx
  ) {
    this.loadRolesAndPermissionsFromStore(); // Cargamos roles y permisos desde el store
  }

  loadRolesAndPermissionsFromStore() {
    this.store.select(selectRoles).pipe(take(1)).subscribe((roles) => {
      this.roles = roles;
    });

    this.store.select(selectPermissions).pipe(take(1)).subscribe((permissions) => {
      this.permisos = permissions;
    });
  }

  logout() {
    this.sessionService.clearLocalStorageData();
    this.router.navigate([Routes_Auth.login]);
  }

}
