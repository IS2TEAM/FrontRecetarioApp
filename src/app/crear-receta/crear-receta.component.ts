import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AppService} from "../service-app.service";
import {NgForm} from "@angular/forms";
import {RecetaModel} from "./receta.model";
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-crear-receta',
  templateUrl: './crear-receta.component.html',
  styleUrls: ['./crear-receta.component.css']
})
export class CrearRecetaComponent implements OnInit{

  constructor(public service: AppService,  public sanitizer: DomSanitizer) {
  }

  imgWidth = '100%';
  imageUrl: string | null = null;
  imageFile: File | null = null;
  inspectionList$!:Observable<any[]>;
  inspectionList: any[]=[];
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

  addRecipe(form: NgForm) {
    if (this.imageUrl != null && this.imageFile != null) {
      //const u = this.imageUrl;
      this.service.formDataReceta.recipePhoto = this.imageUrl;
      this.service.formDataReceta.userId = 1;
      console.log(this.service.formDataReceta);
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
          );
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
    }
  }
  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formDataReceta = new RecetaModel();
    this.imageUrl = null;
  }

}
