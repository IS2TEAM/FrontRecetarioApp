import { Component } from '@angular/core';
import {AppService} from "../service-app.service";
import {ActivatedRoute} from "@angular/router";
import {NgForm} from "@angular/forms";
import {UserModel} from "./user.model";

@Component({
  selector: 'app-loging',
  templateUrl: './loging.component.html',
  styleUrls: ['./loging.component.css']
})
export class LogingComponent {
  constructor(
    public service: AppService,
    private route: ActivatedRoute
  ) {


  }
  putUser(id: number) {

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

  }

  getLogin(id: number) {
    this.service.getUserById(id).subscribe(
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
  }


  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formDataUser = new UserModel();
  }


}
