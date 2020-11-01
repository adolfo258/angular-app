import { Injectable } from "@angular/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Observable } from "rxjs";
import { IRestaurant } from "src/app/Interfaces/restaurant";

@Injectable({
  providedIn: "root",
})
export class RestaurantsService {
  url = "http://localhost:3000";

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

  editRestaurantService(user, id): Observable<IRestaurant> {
    return this.http.put<IRestaurant>(`${this.url}/restaurant/${id}`, user);
  }

  uploadAvatar(avatar: File, id): Observable<IRestaurant> {
    const fd = new FormData();
    fd.append("avatar", avatar);

    return this.http.post<IRestaurant>(`${this.url}/restaurant/uploads/${id}`, fd);
  }
}
