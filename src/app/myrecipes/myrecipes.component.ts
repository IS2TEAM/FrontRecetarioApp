import {Component, Sanitizer} from '@angular/core';
import {RecetaModel} from "../models/receta.model";
import {AppService} from "../service-app.service";
import {DatosCompartidosLogin} from "../DatosCompartidosLogin";
import {UserModel} from "../loging/user.model";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-myrecipes',
  templateUrl: './myrecipes.component.html',
  styleUrls: ['./myrecipes.component.css']
})
export class MyrecipesComponent {

  imgWidth = '100%';
  public array: RecetaModel[];
  userList: UserModel[] | undefined = [];

  constructor(public service: AppService, private datosLoginCompartidos: DatosCompartidosLogin, public sanitizer: DomSanitizer) {
    this.array = []
    this.getUserData();
  }

  findUserIdByEmail(userModel: UserModel[] | undefined): number {
    const emailUser = this.datosLoginCompartidos.obtenerDato(); // Obtén el email del modelo
    if (userModel !== undefined) {
      const foundUser = userModel.find(user => user.emailUser === emailUser); // Busca el usuario por su email
      console.log(userModel);
      console.log(emailUser);
      if (foundUser) {
        this.service.getRecipeUserById(foundUser.idUser).subscribe(data => {
          this.array = data;
          console.log("Mis recetas",this.array);
        });
      } else {
        return 0; // Si no se encuentra el usuario, devuelve un valor predeterminado (0 en este caso)
      }
    }
    return 0;
  }


  async getUserData(): Promise<UserModel[] | undefined> {
    const users = await this.service.getUser().toPromise();
    this.userList = users;
    console.log("USUARIOS: ", users);
    this.findUserIdByEmail(users);
    return this.userList;
  }


  populateForm(selectedRecord: RecetaModel) {
    this.service.formDataReceta = Object.assign({}, selectedRecord);
  }

  borrarReceta(idRecipe: number) {
    console.log(idRecipe);
    this.service.deleteIngredient(idRecipe);
    this.service.deleteRecipe(idRecipe);
  }

  protected readonly Sanitizer = Sanitizer;
  protected readonly DomSanitizer = DomSanitizer;
}
