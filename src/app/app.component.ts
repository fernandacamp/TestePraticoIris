import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { ButtonComponent } from "./shared/components/button/button.component";
import { filter } from 'rxjs/operators';
import { TooltipComponent } from "./shared/components/tooltip/tooltip.component";
import { SnackbarComponent } from "./shared/components/snackbar/snackbar.component";
import { UserListComponent } from "./users/pages/user-list/user-list.component";

export enum PageType {
  List = 'list',
  Create = 'create',
  Edit = 'edit',
  Unknown = 'unknown'
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  icon: string = 'assets/images/back.svg';
  pageType: PageType = PageType.Unknown;

  constructor(private router: Router) {}
  goToCreateUser() {
    this.router.navigate(['/users/create']);
  }

  goToListUsers() {
    this.router.navigate(['/users/list']);
  }

}
