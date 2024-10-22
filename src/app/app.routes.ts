import { Routes } from '@angular/router';
import { Routes_app, Routes_Auth } from './core/constants/routes.constants';
import { routesGuard } from './core/guards/routes/routes.guard';

export const routes: Routes = [
    {
        path:Routes_Auth.login,
        loadChildren: () =>
            import('./modules/auth/auth.module').then((mod) => mod.AuthModule),
    },
    {
        path:Routes_app.dashboard,
        loadChildren: () =>
            import('./modules/dashboard/dashboard.module').then((mod) => mod.DashboardModule),
        canActivate:[routesGuard]
    },
    {
        path:Routes_app.posts,
        loadChildren: () =>
            import('./modules/posts/posts.module').then((mod) => mod.PostsModule),
        canActivate:[routesGuard]
    },

];
