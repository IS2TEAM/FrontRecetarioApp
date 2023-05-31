import {Component} from '@angular/core';
import {AppService} from "../service-app.service";
import {IngredientModel} from "../create-recipe/ingredients.model";
import {ActivatedRoute, Router} from "@angular/router";
import {IngredientRecipeModel} from "../create-recipe/IngredientRecipe.model";
import {IngredientsUsersModel} from "../create-recipe/IngredientUser.model";

@Component({
  selector: 'app-details-recipe',
  templateUrl: './details-recipe.component.html',
  styleUrls: ['./details-recipe.component.css']
})
export class DetailsRecipeComponent {
  inspectionList: any[] = [];
  activoSeleccionado: string = '1';
  selectedState = 1
  public page: number = 1;
  public array: IngredientsUsersModel[];
  imgWidth = '100%';

  constructor(public service: AppService, private route: ActivatedRoute, private router: Router) {
    this.array = [];
    const ingredients: IngredientsUsersModel[] = [];
    const temp = this.router.url.split("/");
    const x = temp[temp.length - 1];
    this.service.getRecipeIngredient(x).subscribe((data: IngredientRecipeModel[]) => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        const id = data[i].idIngredient;
        this.service.getIngredientById(id).subscribe((res) => {
          ingredients.push(res);
          this.array = ingredients;
        });
      }
    });

  }


}
