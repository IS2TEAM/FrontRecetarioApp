import {IngredientModel} from "./ingredients.model";

export class RecetaModel{

IdRecipe:number = 0;
RecipesName:string = '';
Instructions: string = '';
TimePreparation : string = '';
Portions: number = 0;
RecipePhoto:string ='';
Recipesingredients: IngredientModel[] = [];
}
