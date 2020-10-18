import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  logedUser: FormGroup

  constructor(public authService:AuthService, private formBuilder:FormBuilder, private route:Router) { 
    this.logedUser = this.formBuilder.group({
      email:["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    })
  }

  ngOnInit(): void { }
  
  loginUser(){
    if(this.logedUser.valid){
      this.authService.loginUser(this.logedUser.value).subscribe(
        res => {
          if(res.token){//si hay token me redirige a home
            this.route.navigateByUrl('home').then().catch()
          }
        },
        err => {
          alert('Email y/o Password incorrecto')
        }
      )
    }else{
      alert('Completa todos los campos')
    }
  }
}
