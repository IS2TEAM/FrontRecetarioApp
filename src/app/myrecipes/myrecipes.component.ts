import { Component } from '@angular/core';
import {RecetaModel} from "../crear-receta/receta.model";
import {AppService} from "../service-app.service";

@Component({
  selector: 'app-myrecipes',
  templateUrl: './myrecipes.component.html',
  styleUrls: ['./myrecipes.component.css']
})
export class MyrecipesComponent {

  imgWidth = '100%';
  public array: RecetaModel[];

  constructor(public service: AppService) {
    this.array = [];
    this.service.getRecipeUserById(1).subscribe(data => {
      this.array = data;
    });
  }



  populateForm(selectedRecord: RecetaModel) {
    this.service.formDataReceta = Object.assign({}, selectedRecord);
  }

  borrarReceta(idRecipe: number) {
    console.log(idRecipe);
    this.service.deleteIngredient(idRecipe);
    this.service.deleteRecipe(idRecipe);
  }
}
