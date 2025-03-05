import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [NavbarComponent, FooterComponent, RouterOutlet],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

}
