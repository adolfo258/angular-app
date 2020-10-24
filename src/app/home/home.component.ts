import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userDecoded//user logeado actualmente

  activeMovile

  constructor(public authService: AuthService, private router:Router) { }


  ngOnInit(): void {
    this.userDecoded = this.authService.getUserLoged()
  }


  changeClass(){
    if(this.activeMovile === ''){
      this.activeMovile = 'active'
    }else{
      this.activeMovile = ''
    }
  }
}
