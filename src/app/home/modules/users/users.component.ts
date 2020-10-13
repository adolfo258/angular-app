import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/user/users.service'


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(public userService: UsersService) { }

  ngOnInit(): void {
     this.getUsers()
  }

  //Me trae todos los users
  getUsers(){
    this.userService.getUsers().subscribe(
      res=> this.userService.allUsers = res,//Le asigno el array de todos los usuarios a una variable que esta en services
      err => console.log(err)
    )
  }

}
