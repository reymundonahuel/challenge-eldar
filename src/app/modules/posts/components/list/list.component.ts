import { Component, OnInit } from '@angular/core';
import { MenuBarComponent } from '../../../../shared/components/menu-bar/menu-bar.component';
import { ContainerComponent } from '../../../../shared/components/container/container/container.component';
import { CardModule } from 'primeng/card';
import { PostsService } from '../../services/posts/posts.service';

import { ModalsService } from '../../../../shared/services/modals/modals.service';
import { PostsInterface } from '../../../../core/interfaces/posts.interfaces';
import { toastAlert } from '../../../../core/utils/alerts.utils';
import { HttpErrorResponse } from '@angular/common/http';
import { TiposModalEnum } from '../../../../core/enums/tiposModal.enum';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { SelectButtonChangeEvent, SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { PermisosEnum } from '../../../../core/enums/permissions.enum';
import { RolesEnum } from '../../../../core/enums/roles.enum';
import { TruncarTextoPipe } from "../../../../shared/pipes/truncar-texto.pipe";
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { selectRoles, selectPermissions } from '../../../../core/store/auth/selectors/auth.selectors';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MenuBarComponent,
    ContainerComponent,
    CardModule,
    TableModule,
    IconFieldModule,
    InputIconModule,
    ButtonModule,
    SelectButtonModule,
    FormsModule,
    CommonModule,
    SkeletonModule,
    TruncarTextoPipe
],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  posts: PostsInterface[] = [];

  loadingTabla: boolean = false;
  tipoVisualizacion:string = 'table';

  gridOptions: any[] = [
    { icon: 'pi pi-bars', value:'table' },
    { icon: 'pi pi-th-large', value:'grid' },
];

  roles: Array<string> = [];
  permisos: Array<string> = [];

  canCreate = PermisosEnum.CREAR_POST;
  admin = RolesEnum.ADMIN


  constructor(
    private modalService: ModalsService,
    private postService: PostsService,
    private store:Store
  ) {
    this.store.select(selectRoles).pipe(take(1)).subscribe((roles) => {
      this.roles = roles;
    });

    // Obtenemos permisos desde el store
    this.store.select(selectPermissions).pipe(take(1)).subscribe((permissions) => {
      this.permisos = permissions;
    });
  }

  ngOnInit(): void {
    this.getPosts();
  }

  onChangeSelection(event:SelectButtonChangeEvent){
    this.tipoVisualizacion = event.value

  }

  getPosts() {
    this.loadingTabla = true;
    this.postService.getPosts().subscribe({
      next: (value) => {
        this.posts = value;
        this.loadingTabla = false;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        toastAlert(`Ha ocurrido un error`, 'error');
      },
    });
  }

  createPost() {
    this.modalService.setModalStatus(
      'create-post',
      'open',
      {},
      TiposModalEnum.CREAR
    );
  }

  editPost(data: any) {
    this.modalService.setModalStatus(
      'create-post',
      'open',
      data,
      TiposModalEnum.EDITAR
    );
  }

  deletePost(id: number) {
    this.postService.deletePost(id).subscribe({
      next: (value) => {
        toastAlert(`Se ha eliminado con exito`, 'success');
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        toastAlert(`Ha ocurrido un error`, 'error');
      },
    })
    //eliminacion logica solo para que no aparezca en la pantalla
    var removerObjeto = this.posts.map(item => item.id).indexOf(id);
    (removerObjeto >= 0) && this.posts.splice(removerObjeto, 1);

  }

  cortarTexto(texto: string) {
    return texto.substring(0, 20) + '...';
  }
}
