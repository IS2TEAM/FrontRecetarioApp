import { Component } from '@angular/core';
import {RecetaModel} from "../crear-receta/receta.model";
import {AppService} from "../service-app.service";
import {RecipeService} from "./RecipeService.service";
import {IngredientModel} from "../crear-receta/ingredients.model";
import {Observable, of} from "rxjs";
@Component({
  selector: 'app-view-ingredients',
  templateUrl: './view-recipes.component.html',
  styleUrls: ['./view-recipes.component.css']
})
export class ViewRecipesComponent {

  imgWidth = '100%';
  public array: any[] = [];
  pageSize: number = 10;
  backPage: number = 0;
  currentPage: number = 1;
  netxPage: number = 2;
  currentSortOrder: string = "asc";
  curreentSortBy: string = "desc";
  currentNameFilter: string = "";
  tamanio: number = 0;

  public page: number=1;
  inspectionList$!:Observable<any[]>;
  inspectionList: any[]=[];
  sortColumn: string = 'name';
  sortAsc: boolean = true;
  selectedState = 1;
  activoSeleccionado: string ='1';
  listFilter: any[]=[]

  myFunctionName(studentLn: string): void {
    this.sortBy(studentLn);
    this.changeIconName();
  }

  iconName = 'keyboard_arrow_down';
  clickedName: boolean = true;

  changeIconName() {
    if (this.clickedName == true) {
      this.iconSub = 'keyboard_arrow_down'
      this.iconName = 'keyboard_arrow_up'
      this.iconDate = 'keyboard_arrow_down'
      this.iconId = 'keyboard_arrow_down'
      this.clickedName = false
    } else {
      this.clickedName = true
      this.iconName = 'keyboard_arrow_down'
      this.iconDate = 'keyboard_arrow_down'
      this.iconId = 'keyboard_arrow_down'
      this.iconSub = 'keyboard_arrow_down'
    }
  }

  myFunctionSub(studentLn: string): void {
    this.sortBy(studentLn);
    this.changeIconLn();
  }

  iconSub = 'keyboard_arrow_down';
  clickedSub: boolean = true;

  changeIconLn() {
    if (this.clickedSub == true) {
      this.iconSub = 'keyboard_arrow_up'
      this.iconName = 'keyboard_arrow_down'
      this.iconId = 'keyboard_arrow_down'
      this.iconDate = 'keyboard_arrow_down'
      this.clickedSub = false
    } else {
      this.clickedSub = true
      this.iconSub = 'keyboard_arrow_down'
      this.iconDate = 'keyboard_arrow_down'
      this.iconName = 'keyboard_arrow_down'
      this.iconId = 'keyboard_arrow_down'
      this.iconSub = 'keyboard_arrow_down'
    }
  }

  myFunctionId(studentId: string): void {
    this.sortBy(studentId);
    this.changeIconId();
  }

  iconDate = 'keyboard_arrow_down';
  clickedDate: boolean = true;

  myFunctionDate(dateInscription: string) {
    this.sortBy(dateInscription)
    this.changeIconDate();
  }

  changeIconDate() {
    if (this.clickedId == true) {
      this.iconSub = 'keyboard_arrow_down'
      this.iconName = 'keyboard_arrow_down'
      this.iconId = 'keyboard_arrow_down'
      this.iconDate = 'keyboard_arrow_up'
      this.clickedId = false
    } else {
      this.clickedId = true
      this.iconDate = 'keyboard_arrow_down'
      this.iconId = 'keyboard_arrow_down'
      this.iconName = 'keyboard_arrow_down'
      this.iconId = 'keyboard_arrow_down'
      this.iconSub = 'keyboard_arrow_down'
    }
  }

  iconId = 'keyboard_arrow_down';
  clickedId: boolean = true;

  changeIconId() {
    if (this.clickedId == true) {
      this.iconSub = 'keyboard_arrow_down'
      this.iconName = 'keyboard_arrow_down'
      this.iconId = 'keyboard_arrow_up'
      this.iconDate = 'keyboard_arrow_down'
      this.clickedId = false
    } else {
      this.clickedId = true
      this.iconId = 'keyboard_arrow_down'
      this.iconName = 'keyboard_arrow_down'
      this.iconId = 'keyboard_arrow_down'
      this.iconSub = 'keyboard_arrow_down'
      this.iconDate = 'keyboard_arrow_down'
    }
  }

  populateForm(selectedRecord: RecetaModel) {
    this.service.formDataReceta = Object.assign({}, selectedRecord);
  }

  public getNextPage() {
    if (this.currentPage < 19000) {//getMaxPage
      this.getRecipe(this.currentPage = this.currentPage + 1, this.pageSize, this.currentSortOrder, this.curreentSortBy, this.currentNameFilter);
      this.getNumberNextPage();
      this.getNumberBackPage();
    }
  }

  public getBackPage() {
    if (this.currentPage > 1) {
      this.getRecipe(this.currentPage = this.currentPage - 1, this.pageSize, this.currentSortOrder, this.curreentSortBy, this.currentNameFilter);
      this.actualiceButtons();
    }
  }

  public getNumberNextPage() {
    this.netxPage = this.currentPage + 1;
  }

  public getNumberBackPage() {
    this.backPage = this.currentPage - 1;
  }

  public getPageButtons(page: number) {
    if (page == 0) {
      if (this.currentPage < 19000) {///getmaxpage
        this.getRecipe(this.netxPage, this.pageSize, this.currentSortOrder, this.curreentSortBy, this.currentNameFilter);
        this.currentPage = this.currentPage + 1;
        this.actualiceButtons();
      }
    } else {
      if (this.backPage > 0) {
        this.getRecipe(this.backPage, this.pageSize, this.currentSortOrder, this.curreentSortBy, this.currentNameFilter);
        this.currentPage = this.currentPage - 1;
        this.actualiceButtons();
      }
    }
  }

  public sortBy(sortBy: string) {
    if (this.currentSortOrder === "asc") {
      this.currentSortOrder = "desc";
    } else if (this.currentSortOrder === "desc") {
      this.currentSortOrder = "asc";
    }
    this.curreentSortBy = sortBy;
    this.getRecipe(this.currentPage, this.pageSize, this.currentSortOrder, this.curreentSortBy, this.currentNameFilter);
  }

  filterByName(filter: string) {
    this.currentNameFilter = filter;
    this.getRecipe(this.currentPage, this.pageSize, this.currentSortOrder, this.curreentSortBy, this.currentNameFilter);
  }

  private actualiceButtons() {
    this.getNumberBackPage();
    this.getNumberNextPage();
  }

  private getMaxPage(): number {
    return (this.tamanio / this.pageSize);
  }

  constructor(private RecetasService: RecipeService, public service: AppService) {

  }

  ngOnInit(): void {
    //this.getInscription(1, 10, "asc", "", "");
  }
  public ingredientes: RecetaModel[] = [];
  getRecipe(pageNumber: number, pageSize: number, sortOrder: string, sortBy: string, searchString: string): void {
    console.log("entro" + " " + pageSize + " " + sortOrder + " " + sortBy + searchString)
    this.RecetasService.getRecipe(pageNumber, pageSize, sortOrder, sortBy, searchString).subscribe((response: any) => {
      this.array = response.body;
      const tamInscriptions = response.headers.get("tamanio-ingredient");
      this.tamanio = tamInscriptions;
      console.log('El valor de tamInscriptions es: ' + tamInscriptions);
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

}
