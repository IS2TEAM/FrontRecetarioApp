import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {RecetaModel} from "./crear-receta/receta.model";
import {IngredientModel} from "./crear-receta/ingredients.model";
import {UserModel} from "./loging/user.model";
import {PurchasedIngredientsModel} from "./shopping-list/purchasedIngredients.model";
import {ShoppingListModel} from "./shopping-list/shopping-list.model";
import { tap, map } from 'rxjs/operators';
import {IngredientRecipe} from "./crear-receta/IngredientRecipe";


@Injectable({
  providedIn: 'root'
})
export class AppService {
  readonly APIUrl = "https://localhost:7045/api";

  constructor(private http: HttpClient) {
  }
  loged: boolean = false;
  formDataReceta: RecetaModel = new RecetaModel();
  formDataIngredient : IngredientModel = new IngredientModel();
  formDataUser: UserModel = new UserModel();
  formDataIngredientRecipe: IngredientRecipe = new IngredientRecipe();

  formDataPurchasedIngredientes: PurchasedIngredientsModel = new PurchasedIngredientsModel();
  formDataShopingList: ShoppingListModel = new ShoppingListModel();

  postRecipesIngredient(data:any[]){
    return this.http.post(this.APIUrl+'/Recipesingredients', data);
  }


    getInspectionList(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/Recipes');
  }

  getlast(): Promise<RecetaModel> {
    return this.http.get<any>(this.APIUrl + '/Recipes/GetLastRecipe')
      .toPromise()
      .then(response => response as RecetaModel);
  }

  getRecipeUserById(recipeId: number): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/Recipes/byUser?idUser='+recipeId);
  }



 putRecipes() {
    return this.http.put(`${this.APIUrl}/Recipes/${this.formDataReceta.idRecipe}`, this.formDataReceta);
  }



/*  getLoging() {
    const key = `${this.formDataUser.email}`;
    const value = `${this.formDataUser.pasword}`;
    return this.http.get(`${this.APIUrl}/Users/Login/${key},${value}`).;
  }*/

  getLoging(): Observable<any> {
    const key = this.formDataUser.emailUser;
    const value = this.formDataUser.password;
    return this.http.get(this.APIUrl + '/Users/Login?email='+key+'password='+value);
  }

  getUserValidation():any {
    const key = this.formDataUser.emailUser;
    const value = this.formDataUser.password;
    const url = this.APIUrl + `/Users/Login?email=${key}&password=${value}`;

    this.http.get<any>(url).subscribe(response => {
      const validacion = response.validacion;
      console.log(validacion);
      if (validacion){
       this.loged=true;
      }
    },
      error => {

      });
    return this.loged;
  }

  getUserValidation2(): Promise<boolean> {
    const key = this.formDataUser.emailUser;
    const value = this.formDataUser.password;
    const url = `${this.APIUrl}/Users/Login?email=${key}&password=${value}`;

    return new Promise<boolean>((resolve, reject) => {
      this.http.get<any>(url).subscribe(
        response => {
          const validacion = response.validacion;
          console.log(validacion);
          resolve(validacion);
        },
        error => {
          reject(error);
        }
      );
    });
  }


  postUser() {
    const data = {
      username: this.formDataUser.username,
      emailUser: this.formDataUser.emailUser,
      password: this.formDataUser.password
    };
    return this.http.post(this.APIUrl + '/Users',data);
  }



  putIngredient() {
    return this.http.put(`${this.APIUrl}/Ingredients/${this.formDataIngredient.idIngredient}`, this.formDataReceta);
  }

  putUser() {
    return this.http.put(`${this.APIUrl}/user/${this.formDataUser.username}`, this.formDataUser);
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
