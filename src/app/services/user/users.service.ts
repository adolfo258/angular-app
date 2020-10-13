import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url = 'http://localhost:3000'

  allUsers = {}

  createdUser = {
    name: "",
	  lastName: "",
	  dni: "",
	  fec_nac: "",
    sex: "",
	  password: "",
	  email: "",
	  rol: ""
  }

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(`${this.url}/user`)
  }

  createUser(user) {
    return this.http.post(`${this.url}/user/register`, user) 
  }
}
