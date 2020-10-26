import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { SpinnerService } from "../spinner/spinner.service";

@Injectable({
  providedIn: "root",
})
export class InterceptorService implements HttpInterceptor {
  constructor(private spinnerService: SpinnerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //en cada peticion http se ejecuta este interceptor
    this.spinnerService.spinnerShow();
    const token = localStorage.getItem("Authorization");

    if (token) {
      const request = req.clone({
        setHeaders: {
          Authorization: token,
        },
      });
      return next.handle(request).pipe(finalize(() => this.spinnerService.spinnerHide())); //si hay token le paso el header con el token que me dio el back
    } else {
      return next.handle(req).pipe(finalize(() => this.spinnerService.spinnerHide())); //no hay token entonces le paso el header como venia sin token
    }
  }
}
