import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private baseUrlRecipeGetAll: string | null = 'https://localhost:7045/api/Ingredients';




  constructor(private http:HttpClient) { }

  addInspection(data:any){
    return this.http.post('https://localhost:7045/api/Ingredients', data);
  }


  getInspectionList(): Observable<any[]> {
    return this.http.get<any>('https://localhost:7045/api/Ingredients');
  }

}
