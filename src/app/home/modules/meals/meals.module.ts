import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MealsRoutingModule } from "./meals-routing.module";
import { MealsComponent } from "./meals.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
  declarations: [MealsComponent],
  imports: [
    CommonModule,
    MealsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
})
export class MealsModule {}
