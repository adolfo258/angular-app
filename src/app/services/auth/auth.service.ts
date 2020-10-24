import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:3000'

  constructor(private http: HttpClient, private router:Router) { }

  registerUserService(user) {
    return this.http.post(`${this.url}/user/register`, user)
  }

  loginUser(user) {
    return this.http.post(`${this.url}/user/login`, user).pipe(
      tap((response:any) => {
        if(response.bearerToken){
          localStorage.setItem('Authorization', response.bearerToken)//agrego el token al localstorage al logear
        }
      })
    )
  }

  logout() {
    localStorage.clear()
    this.router.navigateByUrl('auth/login')
  }

  checkRole(roles, userLoged) {
    if(userLoged){
      const userRol = userLoged.user.rol
      const authorized = roles.find(rol => userRol === rol)

      if(authorized){
        return false
      }else{
        return true
      }
    }
  }

  getUserLoged() {// me debuelve los datos del usuario que inicio sesion
    const token = localStorage.getItem('Authorization');
    const helper = new JwtHelperService();
    
    const userLoged = helper.decodeToken(token);

    return userLoged
  }
}
