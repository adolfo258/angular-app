import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {//en cada peticion http se ejecuta este interceptor

    const token = localStorage.getItem('authToken')

    if(token) {
      const request = req.clone({
        setHeaders:{
          authToken: token
        }
      })
      return next.handle(request)//si hay token le paso el header con el token que me dio el back
    }else{
      return next.handle(req)//no hay token entonces le paso el header como venia sin token
    }
  }

  constructor() { }
}
