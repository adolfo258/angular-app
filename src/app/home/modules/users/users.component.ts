import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsersService } from '../../../services/user/users.service'


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  allUsers//array con todos los users

  activeFormClass

  createdUser:FormGroup


  constructor(public userService: UsersService, public authService:AuthService, private formBuilder: FormBuilder) {

    this.createdUser = this.formBuilder.group({
      name: ["", Validators.required],
      lastName: ["", Validators.required],
      dni: ["", [Validators.required,Validators.minLength(7) ,Validators.maxLength(8)]],
      fec_nac: ["", Validators.required],
      sex: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.email]],
      rol:["", Validators.required]
    })

  }

  ngOnInit(): void {
     this.getUsers()
  }

  changeClassForm(clase) {
    this.activeFormClass = clase 
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

  deleteAllUsers() {
    if(confirm('¿Estas seguro de querer borrar todos los usuarios?')){
      this.userService.deleteAllUsers().subscribe(
        res => this.getUsers(),
        err => console.log(err)
      )
    }
  }

  //Crea usuario desde el home
  createUser() {
    if(this.createdUser.valid){
      this.authService.registerUserService(this.createdUser.value).subscribe(
        res => {
          alert('Usuario registrado correctamente')
          this.createdUser.reset()
          this.activeFormClass = ''
          this.getUsers()
        },
        err => {if(err.error.code===11000){
          alert('El email ingresado ya esta en uso')
        }}
      )
    }else if(this.createdUser.value.email != '' && this.createdUser.controls.email.status === 'INVALID'){
        alert('Por favor coloca un email valido')
    }else{
      alert('Por favor completa todos los campos')
    }
  }
}
