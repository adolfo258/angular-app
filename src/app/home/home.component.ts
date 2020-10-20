import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userDecoded//user logeado actualmente

  constructor(public authService: AuthService, private router:Router) { }


  ngOnInit(): void {
    this.getUserLoged()
  }

  getUserLoged() {// me debuelve los datos del usuario que inicio sesion
    const token = localStorage.getItem('authToken');
    const helper = new JwtHelperService();
    
    this.userDecoded = helper.decodeToken(token);
  }

}
