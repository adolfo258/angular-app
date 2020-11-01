import { Injectable } from "@angular/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Observable } from "rxjs";
import { IUser } from "src/app/Interfaces/user";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  url = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  searchUserService(params): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.url}/user/${params}`);
  }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.url}/user`);
  }

  getManagerUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.url}/user/managers/restaurants`);
  }

  getMealManagerUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.url}/user/managers/meals`);
  }

  deleteUser(id: string): Observable<IUser> {
    return this.http.delete<IUser>(`${this.url}/user/${id}`);
  }

  deleteAllUsers(): Observable<IUser[]> {
    return this.http.delete<IUser[]>(`${this.url}/user`);
  }

  editUserService(user, id): Observable<IUser> {
    return this.http.put<IUser>(`${this.url}/user/${id}`, user);
  }

  uploadAvatar(avatar: File, id): Observable<IUser> {
    const fd = new FormData();
    fd.append("avatar", avatar);

    return this.http.post<IUser>(`${this.url}/user/uploads/${id}`, fd);
  }
}
