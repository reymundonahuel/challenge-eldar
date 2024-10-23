import { Component, OnDestroy } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  MinLengthValidator,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { toastAlert } from '../../../../core/utils/alerts.utils';
import { LoginInterface } from '../../../../core/interfaces/login.interfaces';
import { SessionService } from '../../../../shared/services/session/session-service.service';
import { AuthServiceShared } from '../../../../shared/services/auth/auth-service.service';
import { RolesEnum } from '../../../../core/enums/roles.enum';
import { PermisosEnum } from '../../../../core/enums/permissions.enum';
import { NavigationExtras, Router } from '@angular/router';
import { Routes_app } from '../../../../core/constants/routes.constants';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RadioButtonModule } from 'primeng/radiobutton';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectPermissions, selectRoles } from '../../../../core/store/auth/selectors/auth.selectors';
import { setPermissions, setRoles } from '../../../../core/store/auth/actions/auth.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CardModule,
    InputTextModule,
    ButtonModule,
    FloatLabelModule,
    RadioButtonModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnDestroy{
  form: FormGroup;
  roles = [RolesEnum.ADMIN,RolesEnum.USER]

  // Observables para roles y permisos usando NgRx
  roles$: Observable<string[]> = this.store.select(selectRoles);
  permissions$: Observable<string[]> = this.store.select(selectPermissions);
  constructor(
    private authService: AuthServiceService,
    private authShared: AuthServiceShared,
    private sessionService: SessionService,
    private _formbuilder: FormBuilder,
    private router: Router,
    private store: Store
  ) {
    this.form = this._formbuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required,Validators.minLength(8)]),
      rol: new FormControl(''),
    });
  }

  ngOnDestroy(): void {
      this.form.reset()
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
        userData.role = this.form.controls['rol'].value;

        let token = value.token;

        //Almacenamos los tokens encriptados
        this.sessionService.setToken(token);
        this.sessionService.setUserProfile(userData);

        console.log(userData.role)
        //Guardamos los roles y permisos que simulamos
        this.uupdateRolesAndPermissions(userData.role);

        //Navegamos hacia el dashboard
        const navigationExtras: NavigationExtras = {
          state: {
            data: [
              this.authShared.getRoles(),
              this.authShared.getPermissions()
            ]
          }
        }; 
        this.router.navigate([Routes_app.dashboard],navigationExtras);
      },
      error: (error) => {
        toastAlert('Los datos no son correctos', 'error');
      },
    });
  }

  fallar(){
    this.authService.fakeLoginUnSuccessfull(this.form.controls['email'].value).subscribe({
      next: (value)=>{
        //No hay response, por que devuelve 400
      },
      error:(error:HttpErrorResponse)=>{
        console.log(error)
        toastAlert(error.error.error,"error")
      }
    })
  }

  uupdateRolesAndPermissions(rol: string) {
    console.log('Actualizando roles con el rol:', rol); 
  
    this.store.dispatch(setRoles({ roles: [rol] }));
  
    if (rol === RolesEnum.USER) {
      this.store.dispatch(setPermissions({ permissions: [PermisosEnum.LISTAR_POSTS] }));
    } else if (rol === RolesEnum.ADMIN) {
      this.store.dispatch(setPermissions({
        permissions: [
          PermisosEnum.LISTAR_POSTS,
          PermisosEnum.CREAR_POST,
          PermisosEnum.ACTUALIZAR_POST,
          PermisosEnum.ELIMINAR_POST,
        ],
      }));
    }
  }
}
