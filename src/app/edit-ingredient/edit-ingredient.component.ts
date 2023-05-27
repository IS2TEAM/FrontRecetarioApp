import { Component } from '@angular/core';
import {AppService} from "../service-app.service";
import {DomSanitizer} from "@angular/platform-browser";
import {Observable} from "rxjs";

@Component({
  selector: 'app-edit-ingredient',
  templateUrl: './edit-ingredient.component.html',
  styleUrls: ['./edit-ingredient.component.css']
})
export class EditIngredientComponent {

  constructor(public service: AppService,  public sanitizer: DomSanitizer) {
  }

  imgWidth = '100%';
  imageUrl: string | null = null;
  imageFile: File | null = null;
  inspectionList$!:Observable<any[]>;
  inspectionList: any[]=[];

}
