import { Component } from '@angular/core';
import {Observable, of} from "rxjs";
import {RecetaModel} from "../crear-receta/receta.model";
import {RecipeService} from "../view-ingredients/RecipeService.service";
import {AppService} from "../service-app.service";
import {ShoppingListModel} from "./shopping-list.model";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  public page: number=1;
  inspectionList$!:Observable<any[]>;
  inspectionList: any[]=[];
  sortColumn: string = 'name';
  sortAsc: boolean = true;
  selectedState = 1;
  activoSeleccionado: string ='1';
  listFilter: any[]=[]
  public array: any[] = [];
  constructor(private RecetasService: RecipeService, public service: AppService) {

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
}
