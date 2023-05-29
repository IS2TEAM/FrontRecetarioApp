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
    const recipe = new RecetaModel();
    recipe.idRecipe = 1;
    recipe.recipesName = "Arroz chino"
    recipe.instructions = "Arroz chino";
    recipe.recipePhoto = "https://www.elespectador.com/resizer/Ei8A62VOKSvSbR9Z99N56v9Y99Q=/arc-anglerfish-arc2-prod-elespectador/public/FXMTS3IDFZG7VJ5EUR56YKYOCE.jpg";
    this.array.push(recipe);

    const recipe2 = new RecetaModel();
    recipe2.idRecipe = 2;
    recipe2.recipesName = "Arroz chino"
    recipe2.instructions = "Arroz";
    recipe2.recipePhoto = "https://www.elespectador.com/resizer/Ei8A62VOKSvSbR9Z99N56v9Y99Q=/arc-anglerfish-arc2-prod-elespectador/public/FXMTS3IDFZG7VJ5EUR56YKYOCE.jpg";
    this.array.push(recipe2);
  }

  populateForm(selectedRecord: RecetaModel) {
    this.service.formDataReceta = Object.assign({}, selectedRecord);
  }

}
