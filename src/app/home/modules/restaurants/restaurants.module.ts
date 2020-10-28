import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RestaurantsRoutingModule } from "./restaurants-routing.module";
import { RestaurantsComponent } from "./restaurants.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
  declarations: [RestaurantsComponent],
  imports: [
    CommonModule,
    RestaurantsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
})
export class RestaurantsModule {}
