import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {RecetaModel} from "./crear-receta/receta.model";
import {IngredientModel} from "./crear-receta/ingredients.model";


@Injectable({
  providedIn: 'root'
})
export class AppService {
  readonly APIUrl = "https://localhost:7045/api";

  constructor(private http: HttpClient) {
  }

  formDataReceta: RecetaModel = new RecetaModel();
  formDataIngredient : IngredientModel = new IngredientModel();

  getInspectionList(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/Recipes');
  }

 putRecipes() {
    return this.http.put(`${this.APIUrl}/Recipes/${this.formDataReceta.IdRecipe}`, this.formDataReceta);
  }

  putIngredient() {
    return this.http.put(`${this.APIUrl}/Ingredients/${this.formDataIngredient.IdIngredient}`, this.formDataReceta);
  }

  deleteIngredient(){
    return this.http.delete(`${this.APIUrl}/Ingredients/${this.formDataIngredient.IdIngredient}`);
  }

  deleteRecipe(){
    return this.http.delete(`${this.APIUrl}/Recipes/${this.formDataReceta.IdRecipe}`);
  }


  postRecipes() {
    return this.http.post(this.APIUrl + '/Recipes', this.formDataReceta);
  }

  uploadImg(imageFile: File) {
    const formData = new FormData();
    const newFileName = this.formDataReceta.RecipesName + this.formDataReceta.IdRecipe + ".jpg";
    formData.append('file', imageFile, newFileName);
    return this.http.post<string>(this.APIUrl+'/Recipes/uploadImage', formData);
  }

  addInspection(data: any) {
    return this.http.post(this.APIUrl + '/Recipes', data);
  }

  updateInspection(id: number) {
    const data = {
      recipeId: this.formDataReceta.IdRecipe,
      recipeName: this.formDataReceta.RecipesName
    }
    return this.http.put(this.APIUrl+`/Recipes/${id}`,data);
  }

  getRecipeById(recipeId: number): Observable<RecetaModel> {
    return this.http.get<RecetaModel>(`${this.APIUrl}/Recipes/${recipeId}`);
  }

  getIngredientById(ingredientId: number): Observable<IngredientModel> {
    return this.http.get<IngredientModel>(`${this.APIUrl}/Recipes/${ingredientId}`);
  }




}
