import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public authService: AuthService) { 

  }

  ngOnInit(): void {
    
  }

  users:boolean = true
  meals:boolean = false
  restaurants:boolean = false

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
