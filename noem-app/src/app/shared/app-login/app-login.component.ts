import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.css']
})

export class AppLoginComponent {

  constructor( private router:Router, private authservice: AuthService){}

  username: string = '';
  password: string = '';
 

  loggedIn = false;


  login(username: string, password: string) {
    console.log('Tentative de connexion avec username:', username, 'et password:', password);
    const user = this.authservice.login(this.username, this.password);

    if (user) {

      console.log('Role :', user.role);

      // Rediriger vers la page d'accueil
      this.router.navigate(['/home']); 

    } else {

      // Rediriger vers la page de connexion
      this.router.navigate(['/login']); 

      // Réinitialisez les propriétés username et password
      this.username = '';
      this.password = '';

    }

    
  }

}






