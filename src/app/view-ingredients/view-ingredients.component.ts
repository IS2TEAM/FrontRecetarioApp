import { Component } from '@angular/core';
import {RecetaModel} from "../crear-receta/receta.model";
import {AppService} from "../service-app.service";
import {RecipeService} from "./RecipeService.service";
import {IngredientModel} from "../crear-receta/ingredients.model";
import {Observable, of} from "rxjs";
import { DatosCompartidosService } from '../DatosCompartidosService';
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

  public page: number=1;
  inspectionList$!:Observable<any[]>;
  inspectionList: any[]=[];
  sortColumn: string = 'name';
  sortAsc: boolean = true;
  selectedState = 1;
  activoSeleccionado: string ='1';
  listFilter: any[]=[]



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



  iconDate = 'keyboard_arrow_down';
  clickedDate: boolean = true;


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




  filterByName(filter: string) {
    this.currentNameFilter = filter;
    //this.getRecipe(this.currentPage, this.pageSize, this.currentSortOrder, this.curreentSortBy, this.currentNameFilter);
  }



  private getMaxPage(): number {
    return (this.tamanio / this.pageSize);
  }

  constructor(private RecetasService: RecipeService, public service: AppService,private datosCompartidosService: DatosCompartidosService) {
    this.ngOnInit();

  }

  borrarIngrediente(id:number) {
    this.datosCompartidosService.borrarIngrediente(id);
  }



  public ingredientes: IngredientModel[] = [];

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






}
