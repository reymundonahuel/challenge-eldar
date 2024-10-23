import { Component, OnInit } from '@angular/core';
import { MenuBarComponent } from '../../../../shared/components/menu-bar/menu-bar.component';
import { ContainerComponent } from '../../../../shared/components/container/container/container.component';
import { CardModule } from 'primeng/card';
import { DashboardService } from '../../services/dashboard.service';
import { AuthServiceShared } from '../../../../shared/services/auth/auth-service.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { RolesEnum } from '../../../../core/enums/roles.enum';
import { PermisosEnum } from '../../../../core/enums/permissions.enum';
import { SkeletonModule } from 'primeng/skeleton';
import { Routes_app } from '../../../../core/constants/routes.constants';
import { ModalsService } from '../../../../shared/services/modals/modals.service';
import { TiposModalEnum } from '../../../../core/enums/tiposModal.enum';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MenuBarComponent, ContainerComponent, CardModule, SkeletonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  totalPosts: number = 0;
  roles: Array<string> = [];
  permisos: Array<string> = [];

  admin = RolesEnum.ADMIN;
  user = RolesEnum.USER;

  routePosts = Routes_app.posts;

  canCreate = PermisosEnum.CREAR_POST;

  constructor(
    private readonly dashboardService: DashboardService,
    private router: Router,
    private authShared: AuthServiceShared,
    private modalService:ModalsService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const navigation = this.router.getCurrentNavigation();
        const state = navigation?.extras?.state;

        if (state && state['data']) {
          const [roles, permisos] = state['data'];
          this.roles = roles;
          this.permisos = permisos;
        }
      }
    });
  }

  ngOnInit(): void {
    this.countPosts();
  }

  async countPosts() {
    this.totalPosts = await this.dashboardService.countTotalPosts();
  }

  navigation(resource: string) {
    this.router.navigate(
      [resource],
      this.authShared.navigationExtrasWithRoleAndPermission()
    );
  }

  createPostModal(){
    this.modalService.setModalStatus('create-post',"open",{},TiposModalEnum.CREAR)
  }


}
