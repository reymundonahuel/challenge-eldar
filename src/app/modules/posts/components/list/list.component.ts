import { Component, OnInit } from '@angular/core';
import { MenuBarComponent } from '../../../../shared/components/menu-bar/menu-bar.component';
import { ContainerComponent } from '../../../../shared/components/container/container/container.component';
import { CardModule } from 'primeng/card';
import { PostsService } from '../../services/posts/posts.service';
import { AuthServiceShared } from '../../../../shared/services/auth/auth-service.service';
import { ModalsService } from '../../../../shared/services/modals/modals.service';
import { PostsInterface } from '../../../../core/interfaces/posts.interfaces';
import { toastAlert } from '../../../../core/utils/alerts.utils';
import { HttpErrorResponse } from '@angular/common/http';
import { TiposModalEnum } from '../../../../core/enums/tiposModal.enum';
import { TableModule } from 'primeng/table';
import {IconFieldModule} from 'primeng/iconfield'
import {InputIconModule} from 'primeng/inputicon'
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MenuBarComponent, ContainerComponent, CardModule,TableModule,IconFieldModule,InputIconModule,ButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  posts: PostsInterface[] = [];

  loadingTabla:boolean = false;

  roles: Array<string> = [];
  permisos: Array<string> = [];
  constructor(
    private authShared: AuthServiceShared,
    private modalService: ModalsService,
    private postService: PostsService
  ) {
    this.roles = this.authShared.getRoles()
    this.permisos = this.authShared.getPermissions()
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.loadingTabla = true
    this.postService.getPosts().subscribe({
      next: (value) => {
        this.posts = value;
        this.loadingTabla = false
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        toastAlert(`Ha ocurrido un error`, 'error');
      },
    });
  }

  createPost(){
    this.modalService.setModalStatus('create-post',"open",{},TiposModalEnum.CREAR)
  }

  editPost(data:any){
    this.modalService.setModalStatus('create-post',"open",data,TiposModalEnum.EDITAR)
  }

  deletePost(id:string){

  }

  cortarTexto(texto:string){
    return texto.substring(0, 20) + '...';
  }



}
