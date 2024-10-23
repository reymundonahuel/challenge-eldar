import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalsService } from './shared/services/modals/modals.service';
import { DialogModule } from 'primeng/dialog';
import { AddComponent } from './modules/posts/components/add-edit/add.component';
import { ModalTypes } from './core/types/modal.type';
import { TiposModalEnum } from './core/enums/tiposModal.enum';
import { setPermissions, setRoles } from './core/store/auth/actions/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DialogModule,AddComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  modalCreatePost: boolean = false;
  modalData:any = {}
  modalTipo:any;

  constructor(private modalService: ModalsService,private store:Store) {
    this.loadStoredAuthData();
    this.modalService.modal$.subscribe((state) => {
      if (state.name === 'create-post') {
        this.modalCreatePost = state.status === 'open';
        this.modalTipo = state.tipo
        this.modalData = state.data
        console.log(state)
      }
    });
  }

  manejarRespuesta(event:any){
    if (event == 'close') {;
      this.modalService.setModalStatus('create-post',"close",{},TiposModalEnum.CREAR)
    }
  }

  loadStoredAuthData() {
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');
    const permissions = JSON.parse(localStorage.getItem('permissions') || '[]');

    if (roles.length) {
      this.store.dispatch(setRoles({ roles }));
    }

    if (permissions.length) {
      this.store.dispatch(setPermissions({ permissions }));
    }
  }
}
