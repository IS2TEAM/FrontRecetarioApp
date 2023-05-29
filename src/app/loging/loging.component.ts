import { Component } from '@angular/core';
import {AppService} from "../service-app.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {UserModel} from "./user.model";
import { Routes, RouterModule } from '@angular/router';
import {DataService} from "../shared/data.service";

@Component({
  selector: 'app-loging',
  templateUrl: './loging.component.html',
  styleUrls: ['./loging.component.css']
})
export class LogingComponent {
  inputValue: string = '';
  constructor(
    public dataService: DataService,

    public service: AppService,
    private route: Router
  ) {


  }
 /* putUser(id: number) {

      this.service.putUser().subscribe(
        res => {
          // this.toastr.success("exitoso");
          this.getLogin(id);
        },
        err => {
          // this.toastr.error(err);
          console.log(err);
        }
      );

  }*/

/*  getLogin() {
        this.service.getLoging().subscribe(
      res => {
        // this.toastr.success(res.toString());
        const tokenString = JSON.stringify(res);
        const token = JSON.parse(tokenString);
        console.log("token", token.token);

      },
      err => {
        // this.toastr.error(err);
        console.log(err);
      }
    );
  }*/

 getLogin(){
    this.service.getLoging().subscribe(
      isValid => {
        if (isValid) {
          this.route.navigate(['/menu']);
        } else {
          // Realizar acciones adicionales si la validación falla
        }
      },
      err => {
        // Manejar errores si es necesario
      }
    )
  }

  updateInputValue() {
    this.dataService.setInputValue(this.inputValue);
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formDataUser = new UserModel();
  }


}
