export interface RestaurantDataById {
    id:                string;
    name:              string;
    areaName:          string;
    avgRating:         number;
    costForTwoMessage: string;
    cuisines:          string[];
    foodItemsByTitle:   { [key: string]: any[] };
}

export interface FoodCategory { key: string, value: any }[]

export interface FoodItem {
    category: "string";
    inStock?: number;
    name:     string;
    price:    number;
}