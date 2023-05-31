import { Injectable } from '@angular/core';
import {IngredientModel} from "./create-recipe/ingredients.model";

@Injectable({
  providedIn: 'root',
})
export class DatosCompartidosLogin {

  private idUser: string = "";

  constructor() {
  }

  guardarDato(dato: string) {
    this.idUser = dato;
  }

  obtenerDato(): string {
    console.log(this.idUser);
    return this.idUser;
  }


  limpiarDatos() {
    this.idUser = "";
  }



}
