import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  registeredUser: FormGroup;

  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.registeredUser = this.formBuilder.group({
      name: ["", Validators.required],
      lastName: ["", Validators.required],
      dni: ["", [Validators.required, Validators.minLength(7), Validators.maxLength(8)]],
      fec_nac: ["", Validators.required],
      sex: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.email]],
      rol: ["", Validators.required],
    });
  }

  ngOnInit(): void {}

  registerUser() {
    if (this.registeredUser.valid) {
      this.authService.registerUserService(this.registeredUser.value).subscribe(
        (res) => {
          alert("Usuario registrado correctamente");
          this.registeredUser.reset();
          this.router.navigateByUrl("auth/login");
        },
        (err) => {
          if (err.error.code === 11000) {
            alert("El email ingresado ya esta en uso");
          }
        }
      );
    } else if (
      this.registeredUser.value.email != "" &&
      this.registeredUser.controls.email.status === "INVALID"
    ) {
      alert("Por favor coloca un email valido");
    } else {
      alert("Por favor completa todos los campos");
    }
  }
}
