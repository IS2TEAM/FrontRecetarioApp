import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {RecetaModel} from "./models/receta.model";
import {IngredientModel} from "./models/ingredients.model";
import {UserModel} from "./loging/user.model";
import {PurchasedIngredientsModel} from "./models/purchasedIngredients.model";
import {ShoppingListModel} from "./shopping-list/shopping-list.model";
import { tap, map } from 'rxjs/operators';
import {IngredientRecipeModel} from "./models/IngredientRecipe.model";
import {ModelShoppingListIngredient} from "./shopping-list/shoppingList.model";
import {IngredientsUsersModel} from "./models/IngredientUser.model";


@Injectable({
  providedIn: 'root'
})
export class AppService {
  readonly APIUrl = "https://recetarioapp.azurewebsites.net/api";

  constructor(private http: HttpClient) {
  }
  loged: boolean = false;
  formDataReceta: RecetaModel = new RecetaModel();
  formDataIngredient : IngredientModel = new IngredientModel();
  formDataUser: UserModel = new UserModel();
  formIngredientShopee: ModelShoppingListIngredient = new ModelShoppingListIngredient();
  formDataIngredientRecipe: IngredientRecipeModel = new IngredientRecipeModel();

  formDataPurchasedIngredientes: PurchasedIngredientsModel = new PurchasedIngredientsModel();
  formDataShopingList: ShoppingListModel = new ShoppingListModel();

  postRecipesIngredient(data:any):any{
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

  getRecipeIngredient(id: string): Observable<IngredientRecipeModel[]>{
    return this.http.get<any>(this.APIUrl+`/Recipesingredients/getIngredientRecipe/${id}`);
  }



/*
getRecipeIngredient2(id: number): Observable<any[]> {
  return this.http.get<any[]>(this.APIUrl + `Recipesingredients/getIngredientRecipe/${id}`)
    .pipe(
      map(response => response as any[])
    );
}
*/



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
    console.log("RECETA A POSTEAR",this.formDataReceta);
    return this.http.post(this.APIUrl + '/Recipes', this.formDataReceta);
  }



  uploadImg(imageFile: File) {
    const formData = new FormData();
    const newFileName = this.formDataReceta.recipesName + this.formDataReceta.idRecipe + ".jpg";
    formData.append('file', imageFile, newFileName);
    console.log("IMAGEN: ",formData);
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

  getIngredientById(ingredientId: number): Observable<IngredientsUsersModel> {
    return this.http.get<IngredientsUsersModel>(`${this.APIUrl}/IngredientsUsers/${ingredientId}`);
  }

  getUserById(ingredientId: number): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.APIUrl}/recipe/${ingredientId}`);
  }


  getUser(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.APIUrl + '/Users');
  }




}
