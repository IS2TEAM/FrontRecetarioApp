import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AppService} from "../service-app.service";
import {NgForm} from "@angular/forms";
import {RecetaModel} from "./receta.model";
import {DomSanitizer} from '@angular/platform-browser';
import {RecipeService} from "../view-ingredients/RecipeService.service";
import {IngredientRecipe} from "./IngredientRecipe";
import { DatosCompartidosService } from '../DatosCompartidosService';
import {IngredientModel} from "./ingredients.model";



@Component({
  selector: 'app-crear-receta',
  templateUrl: './crear-receta.component.html',
  styleUrls: ['./crear-receta.component.css']
})
export class CrearRecetaComponent implements OnInit{

  constructor(public service: AppService,  public sanitizer: DomSanitizer, public RecetasService: RecipeService, private datosCompartidosService: DatosCompartidosService) {
    this.ngOnInit();


  }

  imgWidth = '100%';
  imageUrl: string | null = null;
  imageFile: File | null = null;
  inspectionList$!:Observable<any[]>;
  ingredientList$!:Observable<any[]>;
  inspectionList: any[]=[];
  ingredientList: any[]=[];
  ngOnInit(): void {
    this.ingredientList$ = this.RecetasService.getInspectionList();
    this.ingredientList$.subscribe((ingredientList) => {
      this.ingredientList = ingredientList;
    });

  }


  formValues: any[] = [];


  handleDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  handleDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    // @ts-ignore
    const file = event.dataTransfer.files[0];
    const blob = file.slice(0, file.size, file.type.replace(/\/(jpeg|png|gif)$/, '/jpg'));
    this.imageFile = new File([blob], file.name, {type: 'image/jpeg'});

    const imageUrl = URL.createObjectURL(blob);
    this.imageUrl = imageUrl;
  }

  handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    // @ts-ignore
    const file = target.files[0];
    const blob = file.slice(0, file.size, file.type.replace(/\/(jpeg|png|gif)$/, '/jpg'));
    this.imageFile = new File([blob], file.name, {type: 'image/jpeg'});
    this.imageUrl = URL.createObjectURL(blob);
  }

  clearPreview() {
    this.imageUrl = null;
  }
  arrayI:any = new IngredientModel();
  arrayO:any = new IngredientRecipe();
  addIngredient() {

    //this.service.formDataIngredientRecipe.idRecipe = 3;
    //this.service.formDataIngredientRecipe.idIngredient = this.service.formDataIngredient.idIngredient;
    //this.service.formDataIngredientRecipe.quantity = this.service.formDataIngredient.quantity;
    //this.service.formDataIngredientRecipe.idRecipeIngredient = 0;
    //console.log(this.service.formDataIngredient.nameIngredient);
    this.service.formDataIngredient.idIngredient = this.findIngredientIdByName(this.service.formDataIngredient.nameIngredient);
    this.arrayI = this.service.formDataIngredient;
    console.log(this.arrayI);
    this.datosCompartidosService.guardarDato(this.arrayI);

  }


  convertArray(ingredients: IngredientModel[], idRecipe: number): IngredientRecipe[] {
    const convertedArray: IngredientRecipe[] = [];

    for (const ingredient of ingredients) {
      const convertedIngredient: IngredientRecipe = {
        idRecipeIngredient: 0,
        idIngredient: ingredient.idIngredient,
        idRecipe: idRecipe,
        quantity: ingredient.quantity,
      };

      convertedArray.push(convertedIngredient);
    }

    return convertedArray;
  }

  findIngredientIdByName(name: string): number {
    const ingredient = this.ingredientList.find(item => item.nameIngredient === name);
    return ingredient?.idIngredient;
  }



  addRecipe(form: NgForm) {
    if (this.imageUrl != null && this.imageFile != null) {
      //const u = this.imageUrl;
      this.service.formDataReceta.recipePhoto = this.imageUrl;
      this.service.formDataReceta.userId = 1;
      //console.log(this.service.formDataReceta);
      /*this.service.uploadImg(this.imageFile).subscribe(
        (res: any) => { // actualización del tipo de dato de la respuesta
          //this.toastr.success('Imagen subida con exito', 'Inscripciones UPTC');
          const imageUrl = res.blobUrl;
          this.service.formDataReceta.recipePhoto = imageUrl.toString();
          console.log(this.service.formDataReceta);*/
          this.service.postRecipes().subscribe(
            (res: any) => {

              //this.toastr.success('Agregado con exito foto', 'Inscripciones UPTC');
              this.resetForm(form);
            },
            (err: any) => {
             // this.toastr.error(err.toString());
            }
          )
      this.arrayO = this.service.getlast();
      console.log(this.arrayO.idRecipe);
      console.log(this.datosCompartidosService.obtenerDato());
      //this.arrayI = this.service.getlast();
      console.log(this.convertArray(this.datosCompartidosService.obtenerDato(), this.arrayO.idRecipe ));

          this.service.postRecipesIngredient(this.convertArray(this.datosCompartidosService.obtenerDato(), this.arrayI.idRecipe ));
          this.datosCompartidosService.limpiarDatos();

        //},
        //(err: any) => {
          //this.toastr.error(err.toString());
        //}
     // );
    } else {
      this.service.postRecipes().subscribe(
        (res: any) => {
          //this.toastr.success('Agregado con exito sin foto', 'Inscripciones UPTC');
          this.resetForm(form);
        },
        (err: any) => {
          //this.toastr.error(err);
        }
      );

      console.log(this.convertArray(this.datosCompartidosService.obtenerDato(), this.arrayO.idRecipe ));
      this.arrayI = this.service.getlast();
      this.service.postRecipesIngredient(this.convertArray(this.datosCompartidosService.obtenerDato(), this.arrayO.idRecipe));
      this.datosCompartidosService.limpiarDatos();
    }
  }
  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formDataReceta = new RecetaModel();
    this.imageUrl = null;
  }



}
