import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RestaurantDataById } from './models/resturantFood.model';
import { CoreService } from 'src/app/services/core.services';
import { Observable, Subject, of, takeUntil } from 'rxjs';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css'],
})
export class RestaurantComponent implements OnInit, OnDestroy {
  id!: string;
  selectedRestaurantIdx!: number;
  restaurantData!: RestaurantDataById;
  allRestaurantData!: RestaurantDataById[];
  foodCategories!: { [key: string]: any[] };
  cartData = {
    noOfItems: 0,
    totalPrice: 0,
    cartItems: [] as any[]
  }
  cartData$!: Observable<any>
  destroy = new Subject();


  constructor(
    private route: ActivatedRoute,
    private coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destroy)).subscribe((params: ParamMap) => {
      const id = params.get('id');
      if (id !== null) {
        this.id = id;
        this.getRestaurantById(this.id);
      }
    });

    this.coreService.allRestaurantsCartData.pipe(takeUntil(this.destroy)).subscribe(cart => {
      this.cartData = cart;
      this.cartData$ = of(cart)
    })
  }

  getRestaurantById(id: string) {
    this.coreService.allRestaurantsWithDishData.pipe(takeUntil(this.destroy)).subscribe(
      (restaurants) => {
        if(restaurants !== null) {
          this.allRestaurantData = restaurants;
          this.restaurantData = restaurants.filter((restaurant, idx) => {
            if(restaurant.id == id){
              this.selectedRestaurantIdx = idx;
              return true;
            }
            return false;
          })[0];
          this.foodCategories = this.restaurantData.foodItemsByTitle;
        }
      },
      (error) => {
        console.error(error, 'err');
      }
    );
  }

  addDeleteFromCart(dish: any, type:'ADD' | "SUB") {
    if(type == 'ADD') {
      dish.cartAddedCount = dish.cartAddedCount + 1;
      this.cartData.noOfItems++;
      this.cartData.totalPrice += (dish.price/100); 
      if(dish.cartAddedCount == 1){
          this.cartData.cartItems.push(dish);
      } 
      
    } else {
      dish.cartAddedCount = dish.cartAddedCount - 1;
      this.cartData.noOfItems--;
      this.cartData.totalPrice -= (dish.price/100); 
      if(dish.cartAddedCount == 0) {
        const dishIdx = this.cartData.cartItems.findIndex(cartItem => cartItem.id == dish.id);
        this.cartData.cartItems.splice(dishIdx, 1);
      } 
    }
    this.allRestaurantData[this.selectedRestaurantIdx] = this.restaurantData;
    this.coreService.allRestaurantsCartData.next(this.cartData);
    this.coreService.allRestaurantsWithDishData.next(this.allRestaurantData);
  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }
}

