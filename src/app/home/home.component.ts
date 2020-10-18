import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  users:boolean = false
  meals:boolean = false
  restaurants:boolean = false

  constructor(public authService: AuthService) { 
    
    
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

  ngOnInit(): void {
    
  }

}
