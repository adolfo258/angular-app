import { Injectable } from "@angular/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Observable } from "rxjs";
import { IRestaurant } from "src/app/Interfaces/restaurant";
import { IMeal } from "src/app/Interfaces/meal";

@Injectable({
  providedIn: "root",
})
export class RestaurantsService {
  url = "http://localhost:3001";

  constructor(private http: HttpClient) {}

  searchRestaurantService(params): Observable<IRestaurant[]> {
    return this.http.get<IRestaurant[]>(`${this.url}/restaurant/search/${params}`);
  }

  createRestaurant(restaurant): Observable<IRestaurant> {
    return this.http.post<IRestaurant>(`${this.url}/restaurant`, restaurant);
  }

  getRestaurants(): Observable<IRestaurant[]> {
    return this.http.get<IRestaurant[]>(`${this.url}/restaurant`);
  }

  deleteRestaurant(id: string): Observable<IRestaurant> {
    return this.http.delete<IRestaurant>(`${this.url}/restaurant/${id}`);
  }

  deleteAllRestaurants(): Observable<IRestaurant[]> {
    return this.http.delete<IRestaurant[]>(`${this.url}/restaurant`);
  }

  editRestaurantService(restaurant, id): Observable<IRestaurant> {
    return this.http.put<IRestaurant>(`${this.url}/restaurant/${id}`, restaurant);
  }

  pushMeal(meal, id): Observable<IRestaurant> {
    return this.http.put<IRestaurant>(`${this.url}/restaurant/addmeal/${id}`, meal);
  }

  removeMealFromRestaurant(mealId, id): Observable<IRestaurant> {
    return this.http.put<IRestaurant>(`${this.url}/restaurant/removemeal/${id}`, mealId);
  }

  uploadAvatar(avatar: File, id): Observable<IRestaurant> {
    const fd = new FormData();
    fd.append("avatar", avatar);

    return this.http.post<IRestaurant>(`${this.url}/restaurant/uploads/${id}`, fd);
  }
}
