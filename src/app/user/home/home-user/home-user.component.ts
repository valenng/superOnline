import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ListProductosComponent } from "../../../components/list-productos/list-productos.component";
import { NavbarComponent } from "../../../navbar/navbar.component";

@Component({
  selector: 'app-home-user',
  standalone: true,
  imports: [ListProductosComponent, NavbarComponent],
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent {

}
