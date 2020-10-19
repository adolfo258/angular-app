import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userDecoded//user logeado actualmente

  users:boolean = true
  meals:boolean = false
  restaurants:boolean = false

  constructor(public authService: AuthService) { }


  ngOnInit(): void {
    this.getUserLoged()
  }

  getUserLoged() {// me debuelve los datos del usuario que inicio sesion
    const token = localStorage.getItem('authToken');
    const helper = new JwtHelperService();
    
    this.userDecoded = helper.decodeToken(token);
  }

  changeCrud (crud){
    if(crud==='users'){ 
      this.users = true 
      this.meals = false 
      this.restaurants = false 
    }
    if(crud==='meals'){ 
      this.users = false
      this.meals = true 
      this.restaurants = false 
    }
    if(crud==='restaurants'){ 
      this.users = false
      this.meals = false 
      this.restaurants = true 
    }
  }

}
