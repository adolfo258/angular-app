import { Injectable } from "@angular/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MealsService {
  url = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  searchMealService(params): Observable<any> {
    return this.http.get(`${this.url}/meal/search/${params}`);
  }

  createMeal(meal) {
    return this.http.post(`${this.url}/meal`, meal);
  }

  getMeals() {
    return this.http.get(`${this.url}/meal`);
  }

  deleteMeal(id: string) {
    return this.http.delete(`${this.url}/meal/${id}`);
  }

  deleteAllMeals() {
    return this.http.delete(`${this.url}/meal`);
  }

  editMealService(user, id) {
    return this.http.put(`${this.url}/meal/${id}`, user);
  }

  uploadAvatar(avatar: File, id) {
    const fd = new FormData();
    fd.append("avatar", avatar);

    return this.http.post(`${this.url}/meal/uploads/${id}`, fd);
  }
}
