import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {RecetaModel} from "./crear-receta/receta.model";
import {IngredientModel} from "./crear-receta/ingredients.model";


@Injectable({
  providedIn: 'root'
})
export class AppService {
  readonly APIUrl = "/api";

  constructor(private http: HttpClient) {
  }

  formDataReceta: RecetaModel = new RecetaModel();
  formDataIngredient : IngredientModel = new IngredientModel();

  getInspectionList(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/recipes');
  }

 putRecipes() {
    return this.http.put(`${this.APIUrl}/recipes/${this.formDataReceta.id_recipe}`, this.formDataReceta);
  }

  putIngredient() {
    return this.http.put(`${this.APIUrl}/ingredient/${this.formDataIngredient.id_ingredient}`, this.formDataReceta);
  }

  deleteIngredient(){
    return this.http.delete(`${this.APIUrl}/ingredient/${this.formDataIngredient.id_ingredient}`);
  }

  deleteRecipe(){
    return this.http.delete(`${this.APIUrl}/recipe/${this.formDataReceta.id_recipe}`);
  }


  postRecipes() {
    return this.http.post(this.APIUrl + '/recipes/url', this.formDataReceta);
  }

  uploadImg(imageFile: File) {
    const formData = new FormData();
    const newFileName = this.formDataReceta.recipes_name + this.formDataReceta.id_recipe + ".jpg";
    formData.append('file', imageFile, newFileName);
    return this.http.post<string>(this.APIUrl+'/recipe/uploadImage', formData);
  }

  addInspection(data: any) {
    return this.http.post(this.APIUrl + '/Recipe', data);
  }

  updateInspection(id: number) {
    const data = {
      recipeId: this.formDataReceta.id_recipe,
      recipeName: this.formDataReceta.recipes_name
    }
    return this.http.put(this.APIUrl+`/recipe/${id}`,data);
  }

  getRecipeById(recipeId: number): Observable<RecetaModel> {
    return this.http.get<RecetaModel>(`${this.APIUrl}/recipe/${recipeId}`);
  }

  getUserById(ingredientId: number): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.APIUrl}/recipe/${ingredientId}`);
  }




}
