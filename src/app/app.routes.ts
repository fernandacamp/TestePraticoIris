import { Routes } from '@angular/router';
import { UserListComponent } from './users/pages/user-list/user-list.component';

export const routes: Routes = [
    { path: '', redirectTo: 'users/list', pathMatch: 'full', title: 'Listagem de Usuários' },
    { path: 'users/list', component: UserListComponent },
    { path: '**', redirectTo: 'users/list', title: 'Listagem de Usuários'}
];
