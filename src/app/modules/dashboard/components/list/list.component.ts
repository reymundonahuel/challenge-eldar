import { Component, OnInit } from '@angular/core';
import { MenuBarComponent } from '../../../../shared/components/menu-bar/menu-bar.component';
import { ContainerComponent } from '../../../../shared/components/container/container/container.component';
import { CardModule } from 'primeng/card';
import { DashboardService } from '../../services/dashboard.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { RolesEnum } from '../../../../core/enums/roles.enum';
import { PermisosEnum } from '../../../../core/enums/permissions.enum';
import { SkeletonModule } from 'primeng/skeleton';
import { Routes_app } from '../../../../core/constants/routes.constants';
import { ModalsService } from '../../../../shared/services/modals/modals.service';
import { TiposModalEnum } from '../../../../core/enums/tiposModal.enum';
import { Store } from '@ngrx/store';
import { selectPermissions, selectRoles } from '../../../../core/store/auth/selectors/auth.selectors';
import { take } from 'rxjs';

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
    private store: Store, // Inyectamos el store de NgRx
    private modalService: ModalsService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadRolesAndPermissionsFromStore();
      }
    });
  }

  ngOnInit(): void {
    this.countPosts();
    this.loadRolesAndPermissionsFromStore();
  }

  async countPosts() {
    this.totalPosts = await this.dashboardService.countTotalPosts();
  }

  loadRolesAndPermissionsFromStore() {
    this.store.select(selectRoles).pipe(take(1)).subscribe((roles) => {
      this.roles = roles || []; // Manejo de posible undefined
    });

    this.store.select(selectPermissions).pipe(take(1)).subscribe((permissions) => {
      this.permisos = permissions || []; // Manejo de posible undefined
    });
  }

  navigation(resource: string) {
    const navigationExtras = {
      state: {
        data: [this.roles, this.permisos],
      },
    };
    this.router.navigate([resource], navigationExtras);
  }

  createPostModal() {
    this.modalService.setModalStatus('create-post', 'open', {}, TiposModalEnum.CREAR);
  }

}
