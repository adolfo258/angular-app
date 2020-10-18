import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, tap } from "rxjs/operators";

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
        if(response.token){
          localStorage.setItem('authToken', response.token)//agrego el token al localstorage al logear
        }
      })
    )
  }

  logout() {
    localStorage.clear()
    this.router.navigateByUrl('auth/login')
  }
}
