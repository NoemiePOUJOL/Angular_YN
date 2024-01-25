import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  loggedIn = false;

  //stocker le rôle du user 
  userRole : string;

  // Tableau de login/password/role 
  users = [
    { username: 'user1', password: 'password1', role: 'user' },
    { username: 'admin', password: 'adminpassword', role: 'admin' }
  ];
 
  // Fonction permettant de s'identifier 
  login(username: string, password: string) {
    const user = this.users.find(u => u.username === username && u.password === password);

    if (user) {

      this.userRole = user.role;
      this.loggedIn = true;
      return user; // retourne l'utilisateur trouvé

    } else {

      this.loggedIn = false;
      return null; // null si utilisateur non trouvé

    }
  }

  logIn() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }
  
    // Vérifiez si l'utilisateur est connecté
    isLogged(): boolean {
      return this.loggedIn;
    }
  
    // Vérifiez si l'utilisateur est un administrateur
  
   isAdmin(): boolean {
      const isAdmin = this.loggedIn && this.userRole === 'admin';
      console.log('Est admin ?', isAdmin);
      return isAdmin;
    }
    

  constructor() { }
}
