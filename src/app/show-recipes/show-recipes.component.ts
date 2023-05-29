import { Component } from '@angular/core';
import {RecetaModel} from "../crear-receta/receta.model";
import {AppService} from "../service-app.service";

@Component({
  selector: 'app-show-recipes',
  templateUrl: './show-recipes.component.html',
  styleUrls: ['./show-recipes.component.css']
})
export class ShowRecipesComponent {
  imgWidth = '100%';
  public array: RecetaModel[];
  selectedState = 1
  public page: number=1;

  constructor(public service: AppService) {
    this.array = [];

    this.service.getInspectionList().subscribe(data => {
      this.array = data;
    });


  }
  populateForm(selectedRecord: RecetaModel) {
    this.service.formDataReceta = Object.assign({}, selectedRecord);
  }
}
