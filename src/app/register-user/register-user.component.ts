import { Component } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {NgForm} from "@angular/forms";
import {AppService} from "../service-app.service";
import {UserModel} from "../loging/user.model";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {
  constructor( public service:AppService) {
  }

  registerUser(form: NgForm) {
    this.service.postUser().subscribe(
      (res: any) => {
        // this.toastr.success('Usuario creado con exito', 'Inscripciones UPTC');
        this.resetForm(form);
      },
      (err: any) => {
        // this.toastr.error(err);
      }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formDataUser = new UserModel();
  };

  goBack() {
    window.history.back();
  }
}
