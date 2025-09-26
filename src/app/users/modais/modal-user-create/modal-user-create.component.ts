import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { User, UserService } from '../../../service/user/user.service';
import { SnackbarService } from '../../../service/snackbar/snackbar.service';

@Component({
  selector: 'app-modal-user-create',
  standalone: true,
  imports: [InputComponent,
    ButtonComponent,
    ModalComponent,
    ReactiveFormsModule],
  templateUrl: './modal-user-create.component.html',
  styleUrls: ['./modal-user-create.component.scss']
})
export class ModalUserCreateComponent implements OnInit {

  @Input() userEdit?: User;
  @Input() visible: boolean = false;

  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<User>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;
  loading: boolean = false;
  userId?: string = '';
  edit?: boolean = false;
  closeUserModal: boolean = false;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private snackbarService: SnackbarService) { }

  ngOnInit() {
    this.initForm();

    if (this.userEdit) {
      this.form.patchValue({
        name: this.userEdit.name,
        email: this.userEdit.email,
        age: this.userEdit.age
      });
    }
  }

  private initForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      age: [null as number | null, [Validators.min(18), Validators.max(150)]]
    });
  }

  loadUserData(id: string) {
    this.userService.getUserById(id).subscribe(user => {
      this.userEdit = user;
      this.form.patchValue({
        name: user.name,
        email: user.email,
        age: user.age
      });
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.loading = true;
    const formValue = this.form.value;

    if (this.userEdit && this.edit) {
      const updateUser: User = {
        id: this.userEdit.id,
        name: formValue.name,
        email: formValue.email,
        age: formValue.age
      }
    }

    if (this.userEdit) {
      const updateUser: User = {
        id: this.userEdit.id,
        name: formValue.name,
        email: formValue.email,
        age: formValue.age
      }
      
      this.userService.updateUser(updateUser).subscribe({
        next: () => {
          setTimeout(() => {
            this.snackbarService.showSnackbar({
              message: `Dados do usuário ${formValue.name} editado com sucesso!`,
              type: 'success'
            });
          }, 1500)
          this.confirm.emit(updateUser)
          this.closeModal();
          this.loading = false;
        },
        error: () => {
          this.snackbarService.showSnackbar({
            message: 'Erro ao atualizar dados do usuário',
            type: 'error'
          });
          this.loading = false;
        }
      });

    } else {
      this.userService.addUser(formValue).subscribe({
        next: () => {
          setTimeout(() => {
            this.snackbarService.showSnackbar({
              message: `Usuário ${formValue.name} criado com sucesso!`,
              type: 'success'
            });
          }, 1500)
          this.confirm.emit(formValue)
          this.closeModal();
          this.loading = false;
        },
        error: () => {
          this.snackbarService.showSnackbar({
            message: 'Erro ao criar usuário',
            type: 'error'
          });
          this.loading = false;
        },
      });
    }
  }

  closeModal() {
    this.loading = false;
    this.form.reset();
    this.closeUserModal = false;
    this.close.emit();
  }

  onCancel() {
    this.cancel.emit();
    this.visible = false;
  }
  onConfirm() {
    this.onSubmit()
    // if (!this.form.valid) return;

    // const user: User = {
    //   id: this.userEdit?.id || '',
    //   name: this.form.value.name,
    //   email: this.form.value.email,
    //   age: this.form.value.age
    // };

    // this.confirm.emit(user);
    // this.visible = false;
  }


  get name() { return this.form.get('name'); }
  get email() { return this.form.get('email'); }
  get age() { return this.form.get('age'); }

}
