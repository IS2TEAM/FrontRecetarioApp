import { Injectable } from '@angular/core';
import {IngredientModel} from "./crear-receta/ingredients.model";

@Injectable({
  providedIn: 'root',
})
export class DatosCompartidosService {

  private idUser: string = '';

  constructor() {
  }

  guardarDato(dato: string) {
    this.idUser = dato;
  }

  obtenerDato(): string {
    return this.idUser;
  }


  limpiarDatos() {
    this.idUser = '';
  }



}
