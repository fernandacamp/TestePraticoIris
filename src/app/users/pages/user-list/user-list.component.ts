import { Component, OnInit } from '@angular/core';
import { TableColumn, TableComponent } from '../../../shared/components/table/table.component';
import { User, UserService } from '../../../service/user/user.service';
import { SnackbarService } from '../../../service/snackbar/snackbar.service';
import { ConfirmDeleteModalComponent } from "../../../shared/components/confirm-delete-modal/confirm-delete-modal.component";
import { LoaderComponent } from "../../../shared/components/loader/loader.component";
import { TooltipComponent } from "../../../shared/components/tooltip/tooltip.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [TableComponent, ConfirmDeleteModalComponent, LoaderComponent, TooltipComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  page: number = 1;
  pageSize: number = 10;

  loading: boolean = false;

  selectUserToDelete: User | null = null;
  modalVisible: boolean = false;

  constructor(private userService: UserService, 
    private snackbarService: SnackbarService, 
    private router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;

    this.userService.getUser().subscribe({
      next: (data) => {
        setTimeout(() => {
          this.users = data;
          this.loading = false;
        }, 1500);
      },
      error: (error) => {
        this.snackbarService.showSnackbar({
          message: 'Erro ao carregar usuários.',
          type: 'success',
        });

      },
    });
  }


  openModal(user: User) {
    this.selectUserToDelete = user;
    this.modalVisible = true;

  }

  onDelete() {
    if (!this.selectUserToDelete) return;
    this.loading = true;

    this.userService.deleteUser(this.selectUserToDelete.id).subscribe({
      next: () => {
        setTimeout(() => {
          this.users = this.users.filter(x => x.id !== this.selectUserToDelete!.id);
          this.snackbarService.showSnackbar({
            message: `Usuário ${this.selectUserToDelete!.name} deletado com sucesso.`,
            type: 'success',
          });
          this.modalVisible = false;
          this.selectUserToDelete = null;
        }, 800);
      },
      error: () => {
        this.snackbarService.showSnackbar({
          message: `Erro ao deletar o usuário ${this.selectUserToDelete!.name}.`,
          type: 'error'
        });
        this.modalVisible = false;
        this.selectUserToDelete = null;
      }
    });
    this.loadUsers();
  }

  cancelDelete() {
    this.selectUserToDelete = null;
    this.modalVisible = false;
  }

  goToEdit(user: User) {
    this.router.navigate(['user/edit', user.id]);
  }

}
