import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppButtonComponent } from "./shared/components/button/button.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'testePratico-DesenvolvedorFrontEnd';
}
