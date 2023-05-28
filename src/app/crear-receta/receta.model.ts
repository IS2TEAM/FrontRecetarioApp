import {IngredientModel} from "./ingredients.model";

export class RecetaModel{

idRecipe:number = 0;
recipesName:string = '';
instructions: string = '';
timePreparation : string = '';
portions: number = 0;
recipePhoto:string ='';
recipesingredients: IngredientModel[] = [];
}
