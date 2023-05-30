import { Injectable } from '@angular/core';
import {IngredientModel} from "./crear-receta/ingredients.model";

@Injectable({
  providedIn: 'root',
})
export class DatosCompartidosService {

  private dato: any [] = [];

  constructor() {}

  guardarDato(dato: any) {
    const nuevoDato: IngredientModel = Object.assign({}, dato);
    this.dato.push(nuevoDato);
  }

  obtenerDato(): any[][] {
    return this.dato;
  }



}
