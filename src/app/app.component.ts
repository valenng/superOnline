import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RolSelectionComponent } from "./rol-selection/rol-selection.component";
import { NavigationComponent } from "./user/components/navigation/navigation.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RolSelectionComponent, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'superOnline';
}
