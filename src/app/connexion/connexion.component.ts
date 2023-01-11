import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  estConnecte : any;
  identifiant : string = "";
  motDePasse : string = "";

  constructor(private authService:AuthService, private router:Router) {this.estConnecte = this.authService.loggedIn; }

  ngOnInit(): void {
  }

  login() {
    if(!this.authService.loggedIn) {
      if(this.identifiant == "Normal" &&  this.motDePasse == "normal"){
        this.authService.logIn();
      }else{
        if(this.identifiant == "Admin" &&  this.motDePasse == "admin"){
          this.authService.logInAdmin();
        }else{
          console.log("Echec de la connexion");
        }
      }


    } else {
      this.authService.logOut();
      this.router.navigate(['/home']);
    }
    this.estConnecte = this.authService.loggedIn;
  }
}