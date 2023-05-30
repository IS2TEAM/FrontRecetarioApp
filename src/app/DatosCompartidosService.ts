import { Injectable } from '@angular/core';
import {IngredientModel} from "./crear-receta/ingredients.model";

@Injectable({
  providedIn: 'root',
})
export class DatosCompartidosService {

  private dato: IngredientModel [] = [];

  constructor() {}

  guardarDato(dato: any) {
    const nuevoDato: IngredientModel = Object.assign({}, dato);
    this.dato.push(nuevoDato);
  }

  obtenerDato(): any[] {
    return this.dato;
  }

  editar(id: number, objetoEditado: IngredientModel) {
    console.log(objetoEditado);

    const index = this.dato.findIndex((dato) => dato.idIngredient === id);
    console.log(index);
    if (index !== -1) {
      console.log("entro");
      this.dato[index] = Object.assign({}, objetoEditado);
    }
  }


}
