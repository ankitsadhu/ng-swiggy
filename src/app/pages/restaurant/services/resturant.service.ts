import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, filter, tap, throwError } from "rxjs";
import { RestaurantDataById } from "../models/resturantFood.model";


@Injectable({
    providedIn: 'root'
})
export class RestaurantService {
    constructor(private http: HttpClient) {}


}