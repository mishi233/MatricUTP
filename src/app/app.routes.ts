import { Routes } from '@angular/router';
import { MainPageComponent } from './home/main-page/main-page.component';
import { HorarioComponent } from './home/horario/horario.component';

export const routes: Routes = [
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: '', 
        loadComponent: () => import('./home/sidebar/sidebar.component').then(m => m.SidebarComponent), 
        children: [
            {
                path: 'inicio',
                component: MainPageComponent
            },
            {
                path: 'horario',
                component: HorarioComponent
            }
            
        ]
    }
];