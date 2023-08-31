import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RestaurantComponent } from "./restaurant.component";
import { RestaurantRoutingModule } from "./restaurant-routing.module";
import { RestaurantService } from "./services/resturant.service";

@NgModule({
    imports: [RestaurantRoutingModule, CommonModule],
    declarations: [RestaurantComponent],
    providers: [RestaurantService],
    exports: [RestaurantComponent]
  })
  export class RestaurantModule { }