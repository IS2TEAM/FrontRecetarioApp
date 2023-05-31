import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {RecipeService} from "../view-ingredients/RecipeService.service";
import {AppService} from "../service-app.service";
import {ShoppingListModel} from "./shopping-list.model";
import {IngredientRecipeModel} from "../models/IngredientRecipe.model";
import {IngredientsUsersModel} from "../models/IngredientUser.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  public page: number = 1;
  inspectionList$!: Observable<any[]>;
  inspectionList: any[] = [];
  sortColumn: string = 'name';
  sortAsc: boolean = true;
  selectedState = 1;
  activoSeleccionado: string = '1';
  listFilter: any[] = [];
  public array: any[] = [];

  constructor(
    private RecetasService: RecipeService,
    public service: AppService,
    private router: Router,
    private toastr: ToastrService) {
    this.array = [];
    const ingredients: IngredientsUsersModel[] = [];
    const temp = this.router.url.split("/");
    const x = temp[temp.length - 1];
    this.service.getRecipeIngredient(x).subscribe((data: IngredientRecipeModel[]) => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        const id = data[i].idIngredient;
        this.service.getIngredientById(id).subscribe((res) => {
          ingredients.push(res);
          this.array = ingredients;
        });
      }
    });
  }

  sortByName(): void {
    this.sortColumn = 'subjectName';
    this.sortAsc = !this.sortAsc;
    this.inspectionList.sort((a, b) => {
      const nameA = a.subjectName.toUpperCase();
      const nameB = b.subjectName.toUpperCase();
      if (nameA < nameB) {
        return this.sortAsc ? -1 : 1;
      }
      if (nameA > nameB) {
        return this.sortAsc ? 1 : -1;
      }
      return 0;
    });
  }

  populateForm(selectedRecord: ShoppingListModel) {
    this.service.formDataShopingList = Object.assign({}, selectedRecord);
  }

  save() {
    this.toastr.success("Se creo la lista de compras con exito", "EXITOSO!");
  }
}
