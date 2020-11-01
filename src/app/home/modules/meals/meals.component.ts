import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { IMeal } from "src/app/Interfaces/meal";
import { IUser } from "src/app/Interfaces/user";
import { AuthService } from "src/app/services/auth/auth.service";
import { MealsService } from "src/app/services/meal/meals.service";
import { UsersService } from "../../../services/user/users.service";
import { HomeComponent } from "../../home.component";

@Component({
  selector: "app-meals",
  templateUrl: "./meals.component.html",
  styleUrls: ["./meals.component.scss"],
})
export class MealsComponent implements OnInit {
  allMeals: IMeal[]; //array con todos los meals

  activeFormClass: string; //variable para mostrar o ocultar formulario

  createdMeal: FormGroup; //datos del formulario al ser enviado

  p: number = 1; //paginador

  userLoged: IUser; //usuario que inicio session

  mealSelected: IMeal; //meal selecionado para editarlo y mostrarlo en el form

  avatar: File;

  allMealManagers: IUser[]; // todos los usuarios que son "restaurant_manager"

  constructor(
    public authService: AuthService,
    public homeComponent: HomeComponent,
    private formBuilder: FormBuilder,
    public userService: UsersService,
    public mealService: MealsService
  ) {
    this.createdMeal = this.formBuilder.group({
      name: ["", Validators.required],
      taste: ["", Validators.required],
      origin: ["", Validators.required],
      veggie: ["", Validators.required],
      avatar: "",
      manager: "",
    });
  }

  ngOnInit(): void {
    this.getMeals();

    this.userLoged = this.homeComponent.userDecoded.user;

    this.getManagerUsers();
  }

  changeClassForm(clase: string) {
    //reseteo los valores del userSelected y del formulario cada vez que lo abro o lo cierro
    this.activeFormClass = clase;
    this.mealSelected = null;
    this.createdMeal.patchValue({
      name: "",
      taste: "",
      origin: "",
      veggie: "",
      avatar: "",
      manager: "",
    });
  }

  avatarSelected(event): void {
    if (event.target.files) {
      this.avatar = <File>event.target.files[0];
    }
  }

  changeAvatar(meal: IMeal): void {
    this.mealService.uploadAvatar(this.avatar, meal._id).subscribe(
      res => this.getMeals(),
      err => console.log(err)
    );
  }

  checkRole(roles): boolean {
    return this.authService.checkRole(roles, this.userLoged);
  }

  //verificacion para borrar editar, solo el admin puede hacer todo y luego solo cada manager puede manejar su restaurant
  checkAvatarChange(meal: IMeal): boolean {
    const userRol = this.userLoged.rol;
    const userId = this.userLoged._id;
    const mealmanagerId = meal.manager._id;

    if (userRol === "admin") {
      return false;
    } else if (userRol === "meals_manager" && userId === mealmanagerId) {
      return false;
    } else {
      return true;
    }
  }

  getManagerUsers(): void {
    this.userService.getMealManagerUsers().subscribe(
      res => {
        this.allMealManagers = res;
      },
      err => console.log(err)
    );
  }

  getMeals(): void {
    this.mealService.getMeals().subscribe(
      res => {
        this.allMeals = res;
      },
      err => console.log(err)
    );
  }

  searchMeal(event): void {
    const params = event.target.value;
    if (params.length > 3) {
      this.mealService.searchMealService(params).subscribe(
        res => {
          if (res.length != 0) {
            this.allMeals = res;
          } else {
            this.getMeals();
          }
        },
        err => console.log("not found")
      );
    }
  }

  deleteMeal(id: string): void {
    if (confirm("¿Estas seguro de querer borrar esta comida?")) {
      this.mealService.deleteMeal(id).subscribe(
        res => this.getMeals(),
        err => {
          console.log(err);
          alert("No estas autorizado a borrar comidas");
        }
      );
    }
  }

  deleteAllMeals(): void {
    if (confirm("¿Estas seguro de querer borrar todos las comidas?")) {
      this.mealService.deleteAllMeals().subscribe(
        res => this.getMeals(),
        err => {
          console.log(err);
          alert("No estas autorizado a borrar toda la lista");
        }
      );
    }
  }

  editMeal(meal: IMeal): void {
    this.mealSelected = meal;
    this.activeFormClass = "active";
    this.createdMeal.patchValue(meal);
  }

  uploadAvatar(meal: IMeal): void {
    this.mealService.uploadAvatar(meal.avatar, meal._id).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }

  createOrEditMeal(meal?: IMeal): void {
    //CREAR NUEVO RESTAURANT
    if (!meal) {
      if (this.createdMeal.valid) {
        console.log(this.createdMeal.value);
        this.mealService.createMeal(this.createdMeal.value).subscribe(
          res => {
            alert("Comida creada correctamente");
            this.createdMeal.reset();
            this.activeFormClass = "";
            this.getMeals();
          },
          err => {
            alert("Error en la validacion al crear comida");
          }
        );
      } else {
        alert("Por favor completa todos los campos correctamente");
      }
    } else {
      //EDITAR RESTAURANT
      if (this.createdMeal.valid) {
        this.mealService.editMealService(this.createdMeal.value, this.mealSelected._id).subscribe(
          res => {
            alert("Comida editada correctamente");
            this.createdMeal.reset();
            this.activeFormClass = "";
            this.getMeals();
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
