import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Router } from '@angular/router';



@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(
     private router: Router) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //En esta linea pones el token que debe estar en el sessionStorage, con el nombre que le hayas puesto
    let token = JSON.parse(sessionStorage.getItem("token"));
    console.log(token);
    
    if (token) {
      request = request.clone({
        headers: request.headers.set("Authorization" , token),
      });
    }
    if (!request.headers.has("Content-Type")) {
      request = request.clone({
        headers: request.headers.set("Content-Type", "application/json"),
      });
    }
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status == 403 || error.status == 401) {
          this.router.navigate([""]);
        }
        return throwError(error);
      })
    );
  }
}
