import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { GuardGuard } from "../app/guards/guard.guard";
import { InterceptorService } from './services/httpInterceptor/interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HomeModule,
    HttpClientModule
  ],
  providers: [ GuardGuard, { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
