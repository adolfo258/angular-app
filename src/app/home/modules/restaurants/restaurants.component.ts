import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { AuthService } from "src/app/services/auth/auth.service";
import { RestaurantsService } from "src/app/services/restaurant/restaurants.service";
import { UsersService } from "src/app/services/user/users.service";
import { HomeComponent } from "../../home.component";

@Component({
  selector: "app-restaurants",
  templateUrl: "./restaurants.component.html",
  styleUrls: ["./restaurants.component.scss"],
})
export class RestaurantsComponent implements OnInit {
  allRestaurants; //array con todos los restaurants

  activeFormClass; //variable para mostrar o ocultar formulario

  createdRestaurant: FormGroup; //datos del formulario al ser enviado

  p: number = 1; //paginador

  userLoged; //usuario que inicio session

  restaurantSelected; //usuario selecionado para editarlo y mostrarlo en el form

  avatar: File;

  allUsersManagers; // todos los usuarios que son "restaurant_manager"

  constructor(
    public restaurantService: RestaurantsService,
    public authService: AuthService,
    public homeComponent: HomeComponent,
    private formBuilder: FormBuilder,
    public userService: UsersService
  ) {
    this.createdRestaurant = this.formBuilder.group({
      name: ["", Validators.required],
      smoke: ["", Validators.required],
      lat: ["", Validators.required],
      long: ["", Validators.required],
      cuit: ["", Validators.required],
      managerId: ["", Validators.required],
      avatar: "",
    });
  }

  ngOnInit(): void {
    this.getRestaurants();

    this.userLoged = this.homeComponent.userDecoded.user;
    console.log(this.userLoged);

    this.getManagerUsers();
  }

  changeClassForm(clase) {
    //reseteo los valores del userSelected y del formulario cada vez que lo abro o lo cierro
    this.activeFormClass = clase;
    this.restaurantSelected = null;
    this.createdRestaurant.patchValue({
      _id: "",
      smoke: "",
      lat: "",
      long: "",
      cuit: "",
      meals: "",
      managerId: "",
      avatar: "",
    });
  }

  avatarSelected(event): void {
    if (event.target.files) {
      this.avatar = <File>event.target.files[0];
    }
  }

  changeAvatar(id) {
    this.restaurantService.uploadAvatar(this.avatar, id).subscribe(
      res => this.getRestaurants(),
      err => console.log(err)
    );
  }

  checkRole(roles) {
    return this.authService.checkRole(roles, this.userLoged);
  }

  //verificacion para borrar editar, solo el admin puede hacer todo y luego solo cada manager puede manejar su restaurant
  checkAvatarChange(restaurant) {
    const userRol = this.userLoged.rol;
    const userId = this.userLoged._id;
    const managerId = restaurant.managerId;

    if (userRol === "admin") {
      return false;
    } else if (userRol === "restaurant_manager" && userId === managerId) {
      return false;
    } else {
      return true;
    }
  }

  getManagerUsers() {
    this.userService.getManagerUsers().subscribe(
      res => {
        this.allUsersManagers = res.users;
      },
      err => console.log(err)
    );
  }

  getRestaurants() {
    this.restaurantService.getRestaurants().subscribe(
      res => (this.allRestaurants = res),
      err => console.log(err)
    );
  }

  searchRestaurant(event) {
    const params = event.target.value;

    this.restaurantService.searchRestaurantService(params).subscribe(
      res => {
        if (res.rest.length != 0) {
          this.allRestaurants = res.rest;
        } else {
          this.getRestaurants();
        }
      },
      err => console.log(err)
    );
  }

  deleteRestaurant(id: string) {
    if (confirm("¿Estas seguro de querer borrar este Restaurant?")) {
      this.restaurantService.deleteRestaurant(id).subscribe(
        res => this.getRestaurants(),
        err => {
          console.log(err);
          alert("No estas autorizado a borrar Restaurantes");
        }
      );
    }
  }

  deleteAllRestaurants() {
    if (confirm("¿Estas seguro de querer borrar todos los usuarios?")) {
      this.restaurantService.deleteAllRestaurants().subscribe(
        res => this.getRestaurants(),
        err => {
          console.log(err);
          alert("No estas autorizado a borrar toda la lista");
        }
      );
    }
  }

  editRestaurant(restaurant) {
    this.restaurantSelected = restaurant;
    this.activeFormClass = "active";
    this.createdRestaurant.patchValue(restaurant);
  }

  uploadAvatar(restaurant) {
    this.restaurantService.uploadAvatar(restaurant.avatar, restaurant.id).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }

  createOrEditRestaurant(restaurant?) {
    //CREAR NUEVO RESTAURANT
    if (!restaurant) {
      if (this.createdRestaurant.valid) {
        this.restaurantService.createRestaurant(this.createdRestaurant.value).subscribe(
          res => {
            alert("Restaurante creado correctamente");
            this.createdRestaurant.reset();
            this.activeFormClass = "";
            this.getRestaurants();
          },
          err => {
            alert("No estas autorizado a crear restaurantes");
            console.log(err);
          }
        );
      } else {
        alert("Por favor completa todos los campos correctamente");
      }
    } else {
      //EDITAR RESTAURANT
      if (this.createdRestaurant.valid) {
        this.restaurantService
          .editRestaurantService(this.createdRestaurant.value, this.restaurantSelected._id)
          .subscribe(
            res => {
              alert("Restaurant editado correctamente");
              this.createdRestaurant.reset();
              this.activeFormClass = "";
              this.getRestaurants();
            },
            err => {
              console.log(err);
            }
          );
      } else {
        alert("Por favor completa todos los campos correctamente");
      }
    }
  }
}
