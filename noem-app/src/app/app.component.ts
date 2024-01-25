import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from './shared/auth.service';
import { AssignmentsService } from './shared/assignments.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
AuthService: any;
isLogged() {
throw new Error('Method not implemented.');
}


  title = 'Application de gestion des devoirs à rendre (Assignments)';
  showSidebar = false;

  constructor(public authService:AuthService, private router:Router, private assignmentService : AssignmentsService){}

  login(){
    if(this.authService.loggedIn){
      this.authService.logout();
      //on renvoie vers la page d'accueil
      this.router.navigate(['/home']);
    } else {
      this.authService.logIn();
    }
  }
  
  
  redirectToLogin() {
    this.router.navigate(['/login']); 
  }

  peuplerBDAvecForkJoin() {
    // version naive et simple
    //this.assignmentsService.peuplerBD();
 
    // meilleure version :
    this.assignmentService.peuplerBDavecForkJoin()
      .subscribe(() => {
        console.log("LA BD A ETE PEUPLEE, TOUS LES ASSIGNMENTS AJOUTES ON RE-AFFICHE LA LISTE");
   // replaceUrl = true = force le refresh, même si
   // on est déjà sur la page d’accueil
 // Marche plus avec la dernière version d’angular
        //this.router.navigate(["/home"], {replaceUrl:true});
   // ceci marche….
   window.location.reload();
      })
  }
 

}
