import {Component} from '@angular/core';
import {RecetaModel} from "../models/receta.model";
import {AppService} from "../service-app.service";
import {RecipeService} from "./RecipeService.service";
import {IngredientModel} from "../models/ingredients.model";
import {Observable} from "rxjs";
import {DatosCompartidosService} from '../DatosCompartidosService';

@Component({
  selector: 'app-view-ingredients',
  templateUrl: './view-ingredients.component.html',
  styleUrls: ['./view-ingredients.component.css']
})
export class ViewIngredientsComponent {

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

  public page: number = 1;
  inspectionList$!: Observable<any[]>;
  inspectionList: any[] = [];
  sortColumn: string = 'name';
  sortAsc: boolean = true;
  selectedState = 1;
  activoSeleccionado: string = '1';
  listFilter: any[] = []


  iconName = 'keyboard_arrow_down';
  clickedName: boolean = true;
  iconSub = 'keyboard_arrow_down';
  clickedSub: boolean = true;
  iconDate = 'keyboard_arrow_down';
  clickedDate: boolean = true;
  iconId = 'keyboard_arrow_down';
  clickedId: boolean = true;
  public ingredientes: IngredientModel[] = [];

  constructor(private RecetasService: RecipeService, public service: AppService, private datosCompartidosService: DatosCompartidosService) {
    this.ngOnInit();

  }

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

  filterByName(filter: string) {
    this.currentNameFilter = filter;
    //this.getRecipe(this.currentPage, this.pageSize, this.currentSortOrder, this.curreentSortBy, this.currentNameFilter);
  }

  borrarIngrediente(id: number) {
    this.datosCompartidosService.borrarIngrediente(id);
  }

  ngOnInit(): void {
    //this.inspectionList$ = this.datosCompartidosService.obtenerDato();
    console.log(this.datosCompartidosService.obtenerDato())
    this.inspectionList = this.datosCompartidosService.obtenerDato();
    //this.inspectionList$.subscribe((inspectionList) => {
    //  this.inspectionList = inspectionList;
    //});
  }

  getInspectionList() {
    this.inspectionList$ = this.service.getInspectionList();
    this.inspectionList$.subscribe((inspectionList) => {
      this.inspectionList = inspectionList;
    });
  }

  back() {
    window.history.back();
  }

  private getMaxPage(): number {
    return (this.tamanio / this.pageSize);
  }
}
