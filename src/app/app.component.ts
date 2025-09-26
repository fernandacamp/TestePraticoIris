import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { ButtonComponent } from "./shared/components/button/button.component";
import { filter } from 'rxjs/operators';
import { TooltipComponent } from "./shared/components/tooltip/tooltip.component";

export enum PageType {
  List = 'list',
  Create = 'create',
  Edit = 'edit',
  Unknown = 'unknown'
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    ButtonComponent, TooltipComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  icon: string = 'assets/images/back.svg';
  pageType: PageType = PageType.Unknown;

  constructor(private router: Router) {
   this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.url.includes('/users/create')) {
          this.pageType = PageType.Create;
        } else if (event.url.includes('/users/edit')) {
          this.pageType = PageType.Edit;
        } else if (event.url.includes('/users/list')) {
          this.pageType = PageType.List;
        } else {
          this.pageType = PageType.Unknown;
        }
      });
  }
  goToCreateUser() {
    this.router.navigate(['/users/create']);
  }

  goToListUsers() {
    this.router.navigate(['/users/list']);
  }

}
