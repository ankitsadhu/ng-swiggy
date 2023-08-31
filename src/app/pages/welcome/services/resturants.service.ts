import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { resturant } from "../models/resturant.model";

@Injectable({
    providedIn: 'root'
})
export class ResturantService {
    constructor(private http: HttpClient) {}

    getAllResturant(): Observable<resturant[]> {
        return this.http.get<resturant[]>('../../../../assets/mockData/resturants.json').pipe(
            catchError(error => {
                return throwError(`Something went wrong${error}`)
            })
        );
    }
}