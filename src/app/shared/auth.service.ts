import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn=false;
  loggedInAdmin=false;//loggedInAdmin fera la distinctien entre un login simple et un login admin

  constructor() { }

  //Ajout de la fonction pour se logger en tant qu'admin
  logInAdmin() {
    this.loggedIn = true;
    this.loggedInAdmin=true;
  }

  logIn() {
    this.loggedIn = true;
  }

  //modification de logOut pour ne pas garder les droits admin
  logOut() {
    this.loggedIn = false;
    this.loggedInAdmin=false;
  }

  // renvoie une promesse qui est résolue si l'utilisateur est loggué en tant qu'admin
  // modification de la promesse pour qu'elle ne se resolve que si l'on est connecté en admin
  isAdmin() {
    const isUserAdmin = new Promise((resolve, reject) => {
      resolve(this.loggedInAdmin);
    });
    return isUserAdmin;
  }

  // renvoie une promesse qui est résolue si l'utilisateur est loggué en tant qu'admin
  isConnected() {
    const isUserConected = new Promise((resolve, reject) => {
      resolve(this.loggedIn);
    });
    return isUserConected;
  }
}
