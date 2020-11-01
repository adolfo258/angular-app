import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup, FormControl } from "@angular/forms";
import { IMeal } from "src/app/Interfaces/meal";
import { IRestaurant } from "src/app/Interfaces/restaurant";
import { IUser } from "src/app/Interfaces/user";
import { AuthService } from "src/app/services/auth/auth.service";
import { MealsService } from "src/app/services/meal/meals.service";
import { RestaurantsService } from "src/app/services/restaurant/restaurants.service";
import { UsersService } from "src/app/services/user/users.service";
import { HomeComponent } from "../../home.component";

@Component({
  selector: "app-restaurants",
  templateUrl: "./restaurants.component.html",
  styleUrls: ["./restaurants.component.scss"],
})
export class RestaurantsComponent implements OnInit {
  allRestaurants: IRestaurant[]; //array con todos los restaurants

  activeFormClass: string; //variable para mostrar o ocultar formulario

  createdRestaurant: FormGroup; //datos del formulario al ser enviado

  p: number = 1; //paginador

  userLoged: IUser; //usuario que inicio session

  restaurantSelected: IRestaurant; //usuario selecionado para editarlo y mostrarlo en el form

  avatar: File;

  allUsersManagers: IUser[]; // todos los usuarios que son "restaurant_manager"

  selectedMeal: FormGroup; //comida seleccionada para agregar a un restaurant

  allMeals: IMeal[];

  constructor(
    public restaurantService: RestaurantsService,
    public authService: AuthService,
    public homeComponent: HomeComponent,
    private formBuilder: FormBuilder,
    public userService: UsersService,
    public mealService: MealsService
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

    this.selectedMeal = formBuilder.group({
      meals: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.mealService.getMeals().subscribe(
      res => (this.allMeals = res),
      err => console.log(err)
    );
    this.getRestaurants();

    this.userLoged = this.homeComponent.userDecoded.user;

    this.getManagerUsers();
  }

  changeClassForm(clase): void {
    //reseteo los valores del userSelected y del formulario cada vez que lo abro o lo cierro
    this.activeFormClass = clase;
    this.restaurantSelected = null;
    this.createdRestaurant.patchValue({
      _id: "",
      name: "",
      smoke: "",
      lat: "",
      long: "",
      cuit: "",
      meals: "",
      managerId: "",
      avatar: "",
    });
  }

  addMealToRestaurant(restaurant: IRestaurant): void {
    this.restaurantService.pushMeal(this.selectedMeal.value, restaurant._id).subscribe(
      res => this.getRestaurants(),
      err => console.log(err)
    );
  }

  removeMealFromRestaurant(restaurant: IRestaurant, mealId) {
    const mealID = { mealId };
    this.restaurantService.removeMealFromRestaurant(mealID, restaurant._id).subscribe(
      res => this.getRestaurants(),
      err => console.log(err)
    );
  }

  avatarSelected(event): void {
    if (event.target.files) {
      this.avatar = <File>event.target.files[0];
    }
  }

  changeAvatar(id): void {
    this.restaurantService.uploadAvatar(this.avatar, id).subscribe(
      res => this.getRestaurants(),
      err => console.log(err)
    );
  }

  checkRole(roles): boolean {
    return this.authService.checkRole(roles, this.userLoged);
  }

  //verificacion para borrar editar, solo el admin puede hacer todo y luego solo cada manager puede manejar su restaurant
  checkAvatarChange(restaurant: IRestaurant): boolean {
    const userRol = this.userLoged.rol;
    const userId = this.userLoged._id;
    const managerId = restaurant.managerId._id;

    if (userRol === "admin") {
      return false;
    } else if (userRol === "restaurant_manager" && userId === managerId) {
      return false;
    } else {
      return true;
    }
  }

  getManagerUsers(): void {
    this.userService.getManagerUsers().subscribe(
      res => {
        this.allUsersManagers = res;
      },
      err => console.log(err)
    );
  }

  getRestaurants(): void {
    this.restaurantService.getRestaurants().subscribe(
      res => {
        this.allRestaurants = res;
      },
      err => console.log(err)
    );
  }

  searchRestaurant(event): void {
    const params = event.target.value;
    if (params.length > 3) {
      this.restaurantService.searchRestaurantService(params).subscribe(
        res => {
          if (res.length != 0) {
            this.allRestaurants = res;
          } else {
            this.getRestaurants();
          }
        },
        err => console.log(err)
      );
    }
  }

  deleteRestaurant(id: string): void {
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

  deleteAllRestaurants(): void {
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

  editRestaurant(restaurant: IRestaurant): void {
    this.restaurantSelected = restaurant;
    this.activeFormClass = "active";
    this.createdRestaurant.patchValue(restaurant);
  }

  uploadAvatar(restaurant: IRestaurant): void {
    this.restaurantService.uploadAvatar(restaurant.avatar, restaurant._id).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }

  createOrEditRestaurant(restaurant?): void {
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
