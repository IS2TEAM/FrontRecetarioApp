import {IngredientModel} from "./ingredients.model";

export class RecetaModel{

id_recipe:number = 0;
recipes_name:string = '';
instructions: string = '';
timePreparation : string = '';
portions: number = 0;
recipe_photo:string ='';
ingredientes: IngredientModel[] = [];
}
