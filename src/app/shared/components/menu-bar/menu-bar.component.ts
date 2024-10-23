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
  roles:Array<string>;
  permisos:Array<string>;
  itemsPosts:Array<any> = []

  //Modals iniciales
  modalStatusOpen = {
    createPost:false,
    editPost:false
  }

  menuItems: Array<any> = [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      styleClass: 'blue-icon',
      command: ()=>{
        this.router.navigate([Routes_app.dashboard])
      }
    },
    {
      label: 'Posts',
      icon: 'pi pi-file',
      styleClass:'blue-icon',
      command: ()=>{
        this.router.navigate([Routes_app.posts])
      },
      items:this.itemsPosts
    },
    {
      label: 'Cerrar sesion',
      icon: 'pi pi-times-circle',
      styleClass:'red-icon',
      command: ()=>{
        //Se puede agrupar todas estas mismas funcion dentro del AuthServiceShared bajo la funcion logout
       this.authShared.clearRolesAndPermissions()
       this.sessionService.clearLocalStorageData()
       this.router.navigate([Routes_Auth.login])
       }
    },
  ];

  constructor(private router:Router,private authShared:AuthServiceShared,private sessionService:SessionService){
    this.roles = this.authShared.getRoles()
    this.permisos = this.authShared.getPermissions()
  }

}
