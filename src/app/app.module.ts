import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GuardGuard } from "../app/guards/guard.guard";
import { InterceptorService } from './services/httpInterceptor/interceptor.service';


import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [ GuardGuard, { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
