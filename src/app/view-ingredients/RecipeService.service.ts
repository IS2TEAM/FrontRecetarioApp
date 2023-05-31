import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private baseUrlRecipeGetAll: string | null = 'https://recetarioapp.azurewebsites.net/api/Ingredients';




  constructor(private http:HttpClient) { }

  addInspection(data:any){
    return this.http.post('https://recetarioapp.azurewebsites.net/api/Ingredients', data);
  }


  getInspectionList(): Observable<any[]> {
    return this.http.get<any>('https://recetarioapp.azurewebsites.net/api/Ingredients');
  }

}
