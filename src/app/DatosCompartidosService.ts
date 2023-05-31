import { Injectable } from '@angular/core';
import {IngredientModel} from "./models/ingredients.model";

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

  borrarIngrediente(id: number) {
    const index = this.dato.findIndex((dato) => dato.idIngredient === id);
    if (index !== -1) {
      this.dato.splice(index, 1);
    }
  }

  limpiarDatos() {
    this.dato = [];
  }
  editar(id: number, objetoEditado: IngredientModel) {
    const index = this.dato.findIndex((dato) => dato.idIngredient === id);
    if (index !== -1) {
      this.dato[index] = Object.assign({}, objetoEditado);
    }
  }


}
