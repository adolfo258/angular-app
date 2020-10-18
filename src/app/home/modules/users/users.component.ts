import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/user/users.service'


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  allUsers

  constructor(public userService: UsersService) { }

  ngOnInit(): void {
     this.getUsers()
  }

  //Me trae todos los users
  getUsers(){
    this.userService.getUsers().subscribe(
      res=> this.allUsers = res,
      err => console.log(err)
    )
  }

}
