import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {RecetaModel} from "./crear-receta/receta.model";
import {IngredientModel} from "./crear-receta/ingredients.model";
import {UserModel} from "./loging/user.model";
import {PurchasedIngredientsModel} from "./shopping-list/purchasedIngredients.model";
import {ShoppingListModel} from "./shopping-list/shopping-list.model";
import {IngredientRecipe} from "./crear-receta/IngredientRecipe";


@Injectable({
  providedIn: 'root'
})
export class AppService {
  readonly APIUrl = "https://localhost:7045/api";

  constructor(private http: HttpClient) {
  }

  formDataReceta: RecetaModel = new RecetaModel();
  formDataIngredient : IngredientModel = new IngredientModel();
  formDataUser: UserModel = new UserModel();
  formDataIngredientRecipe: IngredientRecipe = new IngredientRecipe();

  formDataPurchasedIngredientes: PurchasedIngredientsModel = new PurchasedIngredientsModel();
  formDataShopingList: ShoppingListModel = new ShoppingListModel();

  postRecipesIngredient(data:any){
    return this.http.post(this.APIUrl+'/Recipesingredients', data);
  }

  getInspectionList(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/Recipes');
  }

  getRecipeUserById(recipeId: number): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/Recipes/byUser?idUser='+recipeId);
  }



 putRecipes() {
    return this.http.put(`${this.APIUrl}/Recipes/${this.formDataReceta.idRecipe}`, this.formDataReceta);
  }

  putIngredient() {
    return this.http.put(`${this.APIUrl}/Ingredients/${this.formDataIngredient.idIngredient}`, this.formDataReceta);
  }

  putUser() {
    return this.http.put(`${this.APIUrl}/user/${this.formDataUser.user}`, this.formDataUser);
  }

  deleteIngredient(id:number){
    return this.http.delete(`${this.APIUrl}/Recipesingredients/${id}`);
  }

  deleteRecipe(id:number){
    console.log(`${this.APIUrl}/Recipes/${id}`);
    return this.http.delete(this.APIUrl + '/Recipes/'+id);
  }


  postRecipes() {
    return this.http.post(this.APIUrl + '/Recipes', this.formDataReceta);
  }

  postUser() {
    return this.http.post(this.APIUrl + '/recipes/url', this.formDataUser);
  }

  uploadImg(imageFile: File) {
    const formData = new FormData();
    const newFileName = this.formDataReceta.recipesName + this.formDataReceta.idRecipe + ".jpg";
    formData.append('file', imageFile, newFileName);
    return this.http.post<string>(this.APIUrl+'/Recipes/uploadImage', formData);
  }

  addInspection(data: any) {
    return this.http.post(this.APIUrl + '/Recipes', data);
  }

  updateInspection(id: number) {
    const data = {
      recipeId: this.formDataReceta.idRecipe,
      recipeName: this.formDataReceta.recipesName
    }
    return this.http.put(this.APIUrl+`/Recipes/${id}`,data);
  }

  getRecipeById(recipeId: number): Observable<RecetaModel> {
    return this.http.get<RecetaModel>(`${this.APIUrl}/Recipes/${recipeId}`);
  }

  getIngredientById(ingredientId: number): Observable<IngredientModel> {
    return this.http.get<IngredientModel>(`${this.APIUrl}/Recipes/${ingredientId}`);
  }

  getUserById(ingredientId: number): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.APIUrl}/recipe/${ingredientId}`);
  }




}
