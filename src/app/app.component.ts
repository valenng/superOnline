import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RolSelectionComponent } from "./rol-selection/rol-selection.component";
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "./navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'superOnline';
}
