import { Injectable } from "@angular/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Observable } from "rxjs";
import { IMeal } from "src/app/Interfaces/meal";

@Injectable({
  providedIn: "root",
})
export class MealsService {
  url = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  searchMealService(params): Observable<IMeal[]> {
    return this.http.get<IMeal[]>(`${this.url}/meal/search/${params}`);
  }

  createMeal(meal: IMeal): Observable<IMeal> {
    return this.http.post<IMeal>(`${this.url}/meal`, meal);
  }

  getMeals(): Observable<IMeal[]> {
    return this.http.get<IMeal[]>(`${this.url}/meal`);
  }

  deleteMeal(id: string): Observable<IMeal> {
    return this.http.delete<IMeal>(`${this.url}/meal/${id}`);
  }

  deleteAllMeals(): Observable<IMeal[]> {
    return this.http.delete<IMeal[]>(`${this.url}/meal`);
  }

  editMealService(user, id): Observable<IMeal> {
    return this.http.put<IMeal>(`${this.url}/meal/${id}`, user);
  }

  uploadAvatar(avatar: File, id): Observable<IMeal> {
    const fd = new FormData();
    fd.append("avatar", avatar);

    return this.http.post<IMeal>(`${this.url}/meal/uploads/${id}`, fd);
  }
}
