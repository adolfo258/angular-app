import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url = 'http://localhost:3000'


  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(`${this.url}/user`)
  }

  deleteUser(id:string) {
    return this.http.delete(`${this.url}/user/${id}`)
  }

  deleteAllUsers(){
    return this.http.delete(`${this.url}/user`)
  }

  editUserService(user, id) {
    return this.http.put(`${this.url}/user/${id}`, user)
  }
}
