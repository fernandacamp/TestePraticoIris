import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../shared/components/table/table.component';
import { User, UserService } from '../../../service/user/user.service';
import { SnackbarService } from '../../../service/snackbar/snackbar.service';
import { LoaderComponent } from "../../../shared/components/loader/loader.component";
import { TooltipComponent } from "../../../shared/components/tooltip/tooltip.component";
import { Router } from '@angular/router';
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { SnackbarComponent } from "../../../shared/components/snackbar/snackbar.component";
import { SearchBarComponent } from "../../../shared/components/search-bar/search-bar.component";
import { FormsModule } from '@angular/forms';
import { ConfirmDeleteModalComponent } from '../../modais/confirm-delete-modal/confirm-delete-modal.component';
import { ModalUserCreateComponent } from '../../modais/modal-user-create/modal-user-create.component';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [TableComponent,
    ConfirmDeleteModalComponent,
    LoaderComponent,
    TooltipComponent,
    ModalUserCreateComponent,
    ButtonComponent,
    SnackbarComponent,
    SearchBarComponent,
    FormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  page: number = 1;
  pageSize: number = 10;
  totalUsers: number = 0;
  searchTerm: string = '';

  loading: boolean = false;

  selectUser: User | null | undefined = null;
  modalVisible: boolean = false;
  userModalVisible: boolean = false;

  constructor(private userService: UserService,
    private snackbarService: SnackbarService,
    private router: Router) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
  this.loading = true;

  this.userService.getUsers(this.searchTerm?.trim() ? 0 : this.page).subscribe({
    next: (response) => {
      setTimeout(() => {
        const body: any = response.body;
        const usersArray: any[] = Array.isArray(body)
          ? body
          : Array.isArray(body?.data)
            ? body.data
            : [];

        const filteredUsers = (this.searchTerm?.trim())
          ? usersArray.filter((x: any) =>
              x.name?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
              x.email?.toLowerCase().includes(this.searchTerm.toLowerCase())
            )
          : usersArray;

        const startIndex = (this.page - 1) * this.pageSize;
        this.users = filteredUsers.slice(startIndex, startIndex + this.pageSize);

        this.totalUsers = this.searchTerm?.trim() ? filteredUsers.length : body.items;
        this.loading = false;
      }, 1500);
    },
    error: (error) => {
      this.loading = false;
      this.snackbarService.showSnackbar({
        message: 'Erro ao carregar usuários.',
        type: 'error',
      });
    }
  });
}


  onSearch(term: string) {
    this.searchTerm = term;
    this.page = 1;
    this.loadUsers();
  }


  openModal(user: User) {
    this.selectUser = user;
    this.modalVisible = true;
  }

  onDelete() {
    if (!this.selectUser) return;
    this.loading = true;

    this.userService.deleteUser(this.selectUser.id).subscribe({
      next: () => {
        this.users = this.users.filter(x => x.id !== this.selectUser!.id);
        this.snackbarService.showSnackbar({
          message: `Usuário ${this.selectUser!.name} deletado com sucesso.`,
          type: 'success',
        });
        this.modalVisible = false;
        this.selectUser = null;
      },
      error: () => {
        this.snackbarService.showSnackbar({
          message: `Erro ao deletar o usuário ${this.selectUser!.name}.`,
          type: 'error'
        });
        this.modalVisible = false;
        this.selectUser = null;
      }
    });
    this.loadUsers();
  }


  cancelDelete() {
    this.selectUser = null;
    this.modalVisible = false;
  }

  cancelCreateOrEdit() {
    this.selectUser = null;
    this.userModalVisible = false;
  }

  goToEdit(user: User) {
    this.selectUser = user;
    this.userModalVisible = true;
  }

  openUserModal(user?: User) {
    this.selectUser = user ? {
      id: user.id,
      name: user.name,
      email: user.email,
      age: user.age
    } : undefined;
    this.userModalVisible = true;
  }

  handleUserSubmit(user: User) {
    this.loadUsers()
  }

  closeUserModal() {
    this.userModalVisible = false;
    this.selectUser = undefined;
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadUsers();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadUsers();
    }
  }

  trackById(index: number, user: User) {
    return user.id;
  }

  get totalPages(): number {
    return Math.ceil(this.totalUsers / this.pageSize);
  }

  get pagedUsers(): User[] {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.users.slice(start, end);
  }


}
