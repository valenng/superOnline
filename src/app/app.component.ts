import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RolSelectionComponent } from "./rol-selection/rol-selection.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RolSelectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'superOnline';
}
