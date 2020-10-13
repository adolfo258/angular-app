import { Component, OnInit } from '@angular/core';
import { UsersService } from "../../../services/user/users.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(public userService:UsersService) { }

  ngOnInit(): void {
  }

  createUser(form: NgForm){
    this.userService.createUser(form.value).subscribe(
      res=> {
        alert('Usuario creado exitosamente')
        form.reset()
      },
      err=> { console.log(err) }
    )
  }
}
