import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/user/users.service'


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  allUsers//array con todos los users


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

  deleteUser(id) {
    if(confirm('¿Estas seguro de querer borrar este Usuario?')){
      this.userService.deleteUser(id).subscribe(
        res => this.getUsers(),
        err => console.log(err)
      )
    }
  }
}
