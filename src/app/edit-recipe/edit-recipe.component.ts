import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {NgForm} from "@angular/forms";
import {RecetaModel} from "../create-recipe/receta.model";
import {AppService} from "../service-app.service";
import {DomSanitizer} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import {IngredientModel} from "../create-recipe/ingredients.model";
import {IngredientRecipeModel} from "../create-recipe/IngredientRecipe.model";
import {DatosCompartidosService} from "../DatosCompartidosService";

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent {

  constructor(public service: AppService, public sanitizer: DomSanitizer, private route: ActivatedRoute, private datosCompartidosService: DatosCompartidosService) {
    console.log(this.route.snapshot.paramMap.get('idRecipe'))
  }

  imgWidth = '100%';
  imageUrl: string | null = null;
  imageFile: File | null = null;
  inspectionList$!: Observable<any[]>;
  inspectionList: any[] = [];

  ngOnInit(): void {
  }

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

  populateForm(item: any) {
    const idRecipe = this.route.snapshot.paramMap.get('idRecipe');

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
  addIngredient() {

    //this.service.formDataIngredientRecipe.idRecipe = 3;
    //this.service.formDataIngredientRecipe.idIngredient = this.service.formDataIngredient.idIngredient;
    //this.service.formDataIngredientRecipe.quantity = this.service.formDataIngredient.quantity;
    //this.service.formDataIngredientRecipe.idRecipeIngredient = 0;
    //console.log(this.service.formDataIngredient.nameIngredient);
    this.arrayI = this.service.formDataIngredient;

    this.datosCompartidosService.guardarDato(this.arrayI);

  }


  convertArray(ingredients: IngredientModel[], idRecipe: number): IngredientRecipeModel[] {
    const convertedArray: IngredientRecipeModel[] = [];

    for (const ingredient of ingredients) {
      const convertedIngredient: IngredientRecipeModel = {
        idIngredient: ingredient.idIngredient,
        idRecipe: idRecipe,
        quantity: ingredient.quantity,
      };

      convertedArray.push(convertedIngredient);
    }

    return convertedArray;
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
      this.service.putRecipes().subscribe(
        (res: any) => {

          //this.toastr.success('Agregado con exito foto', 'Inscripciones UPTC');
          this.resetForm(form);
        },
        (err: any) => {
          // this.toastr.error(err.toString());
        }
      )

      //this.service.postRecipesIngredient(this.convertArray(this.datosCompartidosService.obtenerDato()),  //falta idRecipe);
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
      //this.service.postRecipesIngredient(this.convertArray(this.datosCompartidosService.obtenerDato()),  //falta idRecipe);
      this.datosCompartidosService.limpiarDatos();
    }
  }


  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formDataReceta = new RecetaModel();
    this.imageUrl = null;
  }
}
