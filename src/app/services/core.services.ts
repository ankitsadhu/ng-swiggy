import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, throwError } from "rxjs";
import { resturant } from "../pages/welcome/models/resturant.model";
import { RestaurantDataById } from "../pages/restaurant/models/resturantFood.model";

@Injectable({
    providedIn: 'root'
})
export class CoreService {
    constructor(private http: HttpClient) {
        this.init();
    }

    allRestaurantMetaData = new BehaviorSubject<resturant[]| null>(null);
    allRestaurantsWithDishData = new BehaviorSubject<RestaurantDataById[]| null>(null);
    allRestaurantsCartData = new BehaviorSubject({
        noOfItems: 0,
        totalPrice: 0,
        cartItems: [] as any[]
    });

    init() {
        this.getAllRestaurantWithDishes().pipe().subscribe((restaurants) => {
            this.allRestaurantsWithDishData.next(restaurants)
        })
    }

    setAllRestaurantMetaData(value: resturant[]) {
        this.allRestaurantMetaData.next(value);
    }

    getAllRestaurantMetaData() {
        return this.allRestaurantMetaData.value;
    }

    getAllResturant(): Observable<resturant[]> {
        return this.http.get<resturant[]>('../../assets/mockData/resturants.json').pipe(
            catchError(error => {
                return throwError(`Something went wrong${error}`)
            })
        );
    }

    getAllRestaurantWithDishes(): Observable<RestaurantDataById[]> {
        return this.http.get<RestaurantDataById[]>('../../assets/mockData/resturantsWithFoodItem.json').pipe(
            catchError(error => {
                return throwError(`Something went wrong${error}`)
            })
        );
    }
}