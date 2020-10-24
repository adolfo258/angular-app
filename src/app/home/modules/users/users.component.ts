import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsersService } from '../../../services/user/users.service'
import { HomeComponent } from '../../home.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  allUsers//array con todos los users

  activeFormClass//variable para mostrar o ocultar formulario

  createdUser:FormGroup //datos del formulario al ser enviado

  p:number = 1 //paginador

  userLoged//usuario que inicio session

  userSelected//usuario selecionado para editarlo y mostrarlo en el form


  constructor(public userService: UsersService, public authService:AuthService,public homeComponent:HomeComponent , private formBuilder: FormBuilder) {
    this.createdUser = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      dni: ['', [Validators.required,Validators.minLength(7) ,Validators.maxLength(8)]],
      fec_nac: ['', Validators.required],
      sex: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      rol:['', Validators.required]
    })

  }

  ngOnInit(): void {
     this.getUsers()
     this.userLoged = this.homeComponent.userDecoded
  }

  changeClassForm(clase) {  //reseteo los valores del userSelected y del formulario cada vez que lo abro o lo cierro
    this.activeFormClass = clase
    this.userSelected =  null
    this.createdUser.patchValue({
      _id: '',
      name: '',
      lastName: '',
      dni: '',
      fec_nac: '',
      sex: '',
      password: '',
      email:'',
      rol:''
    })
  }

  checkRole(roles) {
    return this.authService.checkRole(roles, this.userLoged)
  }

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
        err => {
          console.log(err)
          alert('No estas autorizado a borrar usuarios')
        }
      )
    }
  }

  deleteAllUsers() {
    if(confirm('¿Estas seguro de querer borrar todos los usuarios?')){
      this.userService.deleteAllUsers().subscribe(
        res => this.getUsers(),
        err => {
          console.log(err)
          alert('No estas autorizado a borrar toda la lista')
        }
      )
    }
  }

  editUser(user) {
    this.userSelected = user
    this.activeFormClass = "active"
    this.createdUser.patchValue(user)
  }

  
  createOrEditUser(user?) {

    //CREAR NUEVO USUARIO
    if(!user){
      console.log(this.createdUser.value)
      if(this.createdUser.valid){
        this.authService.registerUserService(this.createdUser.value).subscribe(
          res => {
            alert('Usuario registrado correctamente')
            this.createdUser.reset()
            this.activeFormClass = ''
            this.getUsers()
          },
          err => {
            if(err.error.code===11000){
            alert('El email ingresado ya esta en uso')
          }}
        )
      }else if(this.createdUser.value.email != '' && this.createdUser.controls.email.status === 'INVALID'){
          alert('Por favor coloca un email valido')
      }else{
        alert('Por favor completa todos los campos')
      }
    }
    else{

      //EDITAR USUARIO
      if(this.createdUser.valid){
        this.userService.editUserService(this.createdUser.value, this.userSelected._id ).subscribe(
          res => {
            alert('Usuario editado correctamente')
            this.createdUser.reset()
            this.activeFormClass = ''
            this.getUsers()
          },
          err => {
            if(err.error.code===11000){
            alert('El email ingresado ya esta en uso')
          }else{
            alert('No estas autorizado a editar usuarios')
          }}
        )
      }else if(this.createdUser.value.email != '' && this.createdUser.controls.email.status === 'INVALID'){
          alert('Por favor coloca un email valido')
      }else{
        alert('Por favor completa todos los campos')
      }
    }
  }
}
