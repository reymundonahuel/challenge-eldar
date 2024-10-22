import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { toastAlert } from '../../../../core/utils/alerts.utils';
import { LoginInterface } from '../../../../core/interfaces/login.interfaces';
import { SessionService } from '../../../../shared/services/session/session-service.service';
import { AuthServiceShared } from '../../../../shared/services/auth/auth-service.service';
import { RolesEnum } from '../../../../core/enums/roles.enum';
import { PermisosEnum } from '../../../../core/enums/permissions.enum';
import { Router } from '@angular/router';
import { Routes_app } from '../../../../core/constants/routes.constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private authService: AuthServiceService,
    private authShared: AuthServiceShared,
    private sessionService: SessionService,
    private _formbuilder: FormBuilder,
    private router:Router
  ) {
    this.form = this._formbuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      rol: new FormControl('')
    });
  }

  login() {
    if (this.form.invalid) {
      toastAlert('¡Debe ingresar datos validos!', 'warning');
      return;
    }
    let data: LoginInterface = {
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value,
    };
    this.authService.doLogin(data).subscribe({
      next: async (value: any) => {
        
        //Simulamos que obtenemos un usuario y le guardamos el rol y token, aunque asi deba venir desde backend
        let userData = this.authService.getProfile();
        userData.token = value.token;
        userData.role = this.form.controls['rol'].value

        let token = value.token;

        //Almacenamos los tokens encriptados
        this.sessionService.setToken(token);
        this.sessionService.setUserProfile(userData);

        //Guardamos los roles y permisos que simulamos
        this.updateRolesAndPermissions(userData.role)

        //Navegamos hacia el dashboard
        this.router.navigate([Routes_app.dashboard])
      },
      error: (error) => {
        toastAlert('Los datos no son correctos', 'error');
      },
    });
  }

  updateRolesAndPermissions(rol: string) {
    this.authShared.setRoles([rol]);
    if (rol == RolesEnum.USER) {
      this.authShared.setPermissions([PermisosEnum.LISTAR_POSTS]);
    } else if (rol == RolesEnum.ADMIN) {
      this.authShared.setPermissions([
        PermisosEnum.LISTAR_POSTS,
        PermisosEnum.CREAR_POST,
        PermisosEnum.ACTUALIZAR_POST,
        PermisosEnum.ELIMINAR_POST,
      ]);
    }
  }
}
