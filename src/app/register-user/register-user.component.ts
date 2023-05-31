import {Component} from '@angular/core';
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
  constructor(public service: AppService, public toastr: ToastrService
  ) {
  }

  registerUser(form: NgForm) {
    this.service.postUser().subscribe(
      (res: any) => {
        this.toastr.success("USUARIO REGISTRADO CON EXITO", "EXITOSO!");
        this.resetForm(form);
        this.goBack();
      },
      (err: any) => {
        this.toastr.error("OCURRIO UN ERROR AL REGISTRARSE", "ERROR!");
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
