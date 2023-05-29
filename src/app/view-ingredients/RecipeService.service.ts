import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private baseUrlRecipeGetAll: string | null = 'https://localhost:7045/api/Ingredients';

  constructor(private http: HttpClient) {
  }

  getRecipe(pageNumber: number = 50, pageSize: number = 10, sortOrder: string = "asc", sortBy: string = "", searchString: string = ""): Observable<any> {
    this.baseUrlRecipeGetAll = "";
    console.log(this.baseUrlRecipeGetAll);
    this.http.get(this.baseUrlRecipeGetAll, { observe: 'response' })
      .toPromise()
      .then(response => {
        if (response && response.headers) {
          return response.headers.get('location');
        } else {
          throw new Error('No se pudo obtener la dirección de redirección');
        }
      });
    console.log(this.baseUrlRecipeGetAll);
    console.log("entro" + " page " + pageSize + " como " + sortOrder + " por " + sortBy + " dsearch " + searchString)
    let url = `${this.baseUrlRecipeGetAll}/all?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}&sortBy=${sortBy}`;
    return this.http.get<any[]>(url, {observe: 'response'});
  }
}
