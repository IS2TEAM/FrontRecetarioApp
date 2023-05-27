import { Component } from '@angular/core';
import {RecetaModel} from "../crear-receta/receta.model";
import {AppService} from "../service-app.service";
import {AppRoutingModule} from "../app-routing.module";
import {IngredientModel} from "../crear-receta/ingredients.model";
import {ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-details-recipe',
  templateUrl: './details-recipe.component.html',
  styleUrls: ['./details-recipe.component.css']
})
export class DetailsRecipeComponent {

  public array: IngredientModel[];
  imgWidth = '100%';
  constructor(
    public service: AppService,
    private route: ActivatedRoute


  ){
    this.array = [];
    const ingredient = new IngredientModel();
   /* ingredient.name_ingredient= "arroz";
    ingredient.price = 200;
    ingredient.shop = "ara";
    this.array.push(ingredient);*/

  }
}
