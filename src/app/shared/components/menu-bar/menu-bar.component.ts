import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { Router } from '@angular/router';
import { Routes_app } from '../../../core/constants/routes.constants';

@Component({
  selector: 'app-menu-bar',
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
      styleClass:'blue-icon'
      ,
      command: ()=>{
        this.router.navigate([Routes_app.posts])
      }
    },
    {
      label: 'Cerrar sesion',
      icon: 'pi pi-times-circle',
      styleClass:'red-icon',
      command: ()=>{
        //Cerrar turno
       }
    },
  ];

  constructor(private router:Router){}


}
