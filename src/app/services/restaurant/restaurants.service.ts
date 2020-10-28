import { Injectable } from "@angular/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RestaurantsService {
  url = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  searchRestaurantService(params): Observable<any> {
    return this.http.get(`${this.url}/restaurant/search/${params}`);
  }

  createRestaurant(restaurant) {
    return this.http.post(`${this.url}/restaurant`, restaurant);
  }

  getRestaurants() {
    return this.http.get(`${this.url}/restaurant`);
  }

  deleteRestaurant(id: string) {
    return this.http.delete(`${this.url}/restaurant/${id}`);
  }

  deleteAllRestaurants() {
    return this.http.delete(`${this.url}/restaurant`);
  }

  editRestaurantService(user, id) {
    return this.http.put(`${this.url}/restaurant/${id}`, user);
  }

  uploadAvatar(avatar: File, id) {
    const fd = new FormData();
    fd.append("avatar", avatar);

    return this.http.post(`${this.url}/restaurant/uploads/${id}`, fd);
  }
}
