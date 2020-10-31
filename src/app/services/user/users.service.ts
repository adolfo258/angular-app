import { Injectable } from "@angular/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  url = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  searchUserService(params): Observable<any> {
    return this.http.get(`${this.url}/user/${params}`);
  }

  getUsers() {
    return this.http.get(`${this.url}/user`);
  }

  getManagerUsers(): Observable<any> {
    return this.http.get(`${this.url}/user/managers/restaurants`);
  }

  getMealManagerUsers(): Observable<any> {
    return this.http.get(`${this.url}/user/managers/meals`);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.url}/user/${id}`);
  }

  deleteAllUsers() {
    return this.http.delete(`${this.url}/user`);
  }

  editUserService(user, id) {
    return this.http.put(`${this.url}/user/${id}`, user);
  }

  uploadAvatar(avatar: File, id) {
    const fd = new FormData();
    fd.append("avatar", avatar);

    return this.http.post(`${this.url}/user/uploads/${id}`, fd);
  }
}
