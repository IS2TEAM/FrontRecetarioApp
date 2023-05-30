import { Component } from '@angular/core';
import {AppService} from "../service-app.service";
import {ToastrService} from "ngx-toastr";
import {NgForm} from "@angular/forms";
import {UserModel} from "../loging/user.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor( public service:AppService
/*                , public toastr: ToastrService*/
  ) {
  }

  registerUser(form: NgForm) {
    this.service.postUser().subscribe(
      (res: any) => {
         // this.toastr.success('Usuario creado con exito', 'Inscripciones UPTC');
        this.resetForm(form);
        console.log("se creo");
      },
      (err: any) => {
         //this.toastr.error(err);
      }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formDataUser = new UserModel();
  };


}
