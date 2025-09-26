import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User, UserService } from '../../../service/user/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SnackbarService } from '../../../service/snackbar/snackbar.service';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../../shared/components/input/input.component';
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  @Input() userEdit?: User;
  @Output() close = new EventEmitter<void>();

  form!: FormGroup;
  loading: boolean = false;
  userId?: string = '';
  edit?: boolean = false;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private snackbarService: SnackbarService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.initForm();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.userId = id;
        this.edit = true;
        this.loadUserData(id);
      }
    });
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

      this.userService.updateUser(updateUser).subscribe(
        () => {
          this.snackbarService.showSnackbar({
            message: `Dados do usuário ${this.userEdit!.name} editado com sucesso!`,
            type: 'success'
          });
          this.loading = false;
          this.closeModal();
        },
        (err) => {
          this.snackbarService.showSnackbar({
            message: 'Erro ao atualizar dados do usuário',
            type: 'error'
          });
          this.loading = false;
        }
      );

    } else {
      this.userService.addUser(formValue).subscribe(
        () => {
          this.snackbarService.showSnackbar({
            message: `Usuário ${this.userEdit!.name} criado com sucesso!`,
            type: 'success'
          });
          this.loading = false;
          this.closeModal();
        },
        (err) => {
          this.snackbarService.showSnackbar({
            message: 'Erro ao criar usuário',
            type: 'error'
          });
          this.loading = false;
        },
      );
    }
  }


  get name() { return this.form.get('name'); }
  get email() { return this.form.get('email'); }
  get age() { return this.form.get('age'); }

  closeModal() {
    this.loading = false;
    this.form.reset();
    this.close.emit();
  }

}
