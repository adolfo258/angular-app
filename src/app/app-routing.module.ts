import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { GuardGuard } from "../app/guards/guard.guard";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "auth",
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule),
  },
  {
    path: "home",
    canLoad: [GuardGuard],
    loadChildren: () => import("./home/home.module").then(m => m.HomeModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
