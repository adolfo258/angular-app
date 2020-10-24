import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanLoad {

  constructor(private router:Router) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const token = localStorage.getItem('Authorization')
      const helper = new JwtHelperService();

      const isExpired = helper.isTokenExpired(token);

      if(!isExpired){//si el token esta vencido o no existe no le doy autorizacion
        return true
      }else{
        alert('No estas autorizado, vuelve a iniciar sesion')
        this.router.navigateByUrl('auth/login')
        return false
      }
  }
}
