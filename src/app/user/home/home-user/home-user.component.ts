import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ListProductosComponent } from "../../components/list-productos/list-productos.component";

@Component({
  selector: 'app-home-user',
  standalone: true,
  imports: [RouterLink, ListProductosComponent],
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent {

}
