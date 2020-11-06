import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { IUser } from "src/app/Interfaces/user";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  url = "http://localhost:3001";

  constructor(private http: HttpClient, private router: Router) {}

  registerUserService(user): Observable<any> {
    return this.http.post(`${this.url}/user/register`, user);
  }

  loginUser(user): Observable<any> {
    return this.http.post(`${this.url}/user/login`, user).pipe(
      tap((response: any) => {
        if (response.bearerToken) {
          localStorage.setItem("Authorization", response.bearerToken); //agrego el token al localstorage al logear
        }
      })
    );
  }

  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl("auth/login");
  }

  checkRole(roles, userLoged): boolean {
    if (userLoged) {
      const userRol = userLoged.rol;
      const authorized = roles.find(rol => userRol === rol);

      if (authorized) {
        return false;
      } else {
        return true;
      }
    }
  }

  getUserLoged(): IUser {
    // me debuelve los datos del usuario que inicio sesion
    const token = localStorage.getItem("Authorization");
    const helper = new JwtHelperService();

    const userLoged = helper.decodeToken(token);

    return userLoged;
  }
}
