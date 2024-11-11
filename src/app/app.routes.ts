import { Routes } from '@angular/router';
import { RolSelectionComponent } from './rol-selection/rol-selection.component';
import { NavigationComponent } from './user/components/navigation/navigation.component';

export const routes: Routes = [
    {path: '', component: RolSelectionComponent},
     // Rutas para cargar módulos con lazy loading
     {path: '', component: NavigationComponent},
    {path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
    {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)}
];
