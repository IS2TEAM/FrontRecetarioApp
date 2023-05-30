import {Component, OnInit} from '@angular/core';
import {AppService} from "../service-app.service";
import {DomSanitizer} from "@angular/platform-browser";
import {Observable} from "rxjs";
import {IngredientModel} from "../crear-receta/ingredients.model";
import  {ActivatedRoute} from "@angular/router";
import {NgForm} from "@angular/forms";
import {DatosCompartidosService} from "../DatosCompartidosService";

@Component({
  selector: 'app-edit-ingredient',
  templateUrl: './edit-ingredient.component.html',
  styleUrls: ['./edit-ingredient.component.css']
})
export class EditIngredientComponent implements OnInit{
public ingredientId: number;
public ingredient: IngredientModel;
public id: number;
  constructor(public service: AppService,  public sanitizer: DomSanitizer, private route: ActivatedRoute,private datosCompartidosService: DatosCompartidosService) {
    this.ingredientId = 0;
    this.ingredient = new IngredientModel();
    this.id = 0;
  }

  populateForm(item: any) {
    this.ingredientId = item;
    this.id = item;
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.ingredientId = params['id'];
      this.getIngredient();
    });
  }

  imgWidth = '100%';
  imageUrl: string | null = null;
  imageFile: File | null = null;
  inspectionList$!:Observable<any[]>;
  inspectionList: IngredientModel[]=[];


  getIngredient(): void {
    this.datosCompartidosService.obtenerDato();
    this.inspectionList = this.datosCompartidosService.obtenerDato();
    //this.service.getIngredientById(id).subscribe(
      //(res: any) => {
        //this.ingredient = res;
        //console.log(res);

      //},
      //(err: any) => {

        //console.log(err);
      //}
    //);
  }

  editIngredient(form: NgForm) {
    this.service.formDataIngredient = new IngredientModel();
    this.service.formDataIngredient.nameIngredient = form.value.nombreIngrediente;
    this.service.formDataIngredient.quantity = form.value.cantidadIngrediente;
    this.service.formDataIngredient.idIngredient = this.id;
    console.log(form.value.nombreIngrediente);
    console.log(form.value.cantidadIngrediente);
    //this.service.formDataIngredient = ;
    this.datosCompartidosService.editar(this.id, this.service.formDataIngredient);
    this.resetForm(form);
  }



  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formDataIngredient = new IngredientModel();
  }

}
