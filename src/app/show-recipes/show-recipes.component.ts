import { Component } from '@angular/core';
import {RecetaModel} from "../crear-receta/receta.model";
import {AppService} from "../service-app.service";

@Component({
  selector: 'app-show-recipes',
  templateUrl: './show-recipes.component.html',
  styleUrls: ['./show-recipes.component.css']
})
export class ShowRecipesComponent {
  imgWidth = '100%';
  public array: RecetaModel[];

  constructor(public service: AppService) {
    this.array = [];
    const recipe = new RecetaModel();
    recipe.id_recipe = 1;
    recipe.recipes_name = "Arroz chino";
    recipe.recipe_photo = "https://www.elespectador.com/resizer/Ei8A62VOKSvSbR9Z99N56v9Y99Q=/arc-anglerfish-arc2-prod-elespectador/public/FXMTS3IDFZG7VJ5EUR56YKYOCE.jpg";
    this.array.push(recipe);

    const recipe2 = new RecetaModel();
    recipe2.id_recipe = 2;
    recipe2.recipes_name = "Arroz";
    recipe2.recipe_photo = "https://www.elespectador.com/resizer/Ei8A62VOKSvSbR9Z99N56v9Y99Q=/arc-anglerfish-arc2-prod-elespectador/public/FXMTS3IDFZG7VJ5EUR56YKYOCE.jpg";
    this.array.push(recipe2);



  }
  populateForm(selectedRecord: RecetaModel) {
    this.service.formDataReceta = Object.assign({}, selectedRecord);
  }
}
