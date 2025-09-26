import { Routes } from '@angular/router';
import { UserListComponent } from './users/pages/user-list/user-list.component';
import { UserCreateComponent } from './users/pages/user-create/user-create.component';

export const routes: Routes = [
    { path: '', redirectTo: 'users/list', pathMatch: 'full', title: 'Listagem de Usuários' },
    { path: 'users/list', component: UserListComponent },
    { path: 'users/create', component: UserCreateComponent },
    { path: 'users/edit/:id', component: UserCreateComponent },
    { path: '**', redirectTo: 'users/list', title: 'Listagem de Usuários'}
];
