import {Component, OnInit} from '@angular/core';
import {AppService} from "../service-app.service";
import {DomSanitizer} from "@angular/platform-browser";
import {Observable} from "rxjs";
import {IngredientModel} from "../crear-receta/ingredients.model";
import  {ActivatedRoute} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-edit-ingredient',
  templateUrl: './edit-ingredient.component.html',
  styleUrls: ['./edit-ingredient.component.css']
})
export class EditIngredientComponent implements OnInit{
public ingredientId: number;
public ingredient: IngredientModel;
  constructor(public service: AppService,  public sanitizer: DomSanitizer, private route: ActivatedRoute) {
    this.ingredientId = 0;
    this.ingredient = new IngredientModel();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.ingredientId = params['id'];
      this.getIngredient(this.ingredientId);
    });
  }

  imgWidth = '100%';
  imageUrl: string | null = null;
  imageFile: File | null = null;
  inspectionList$!:Observable<any[]>;
  inspectionList: any[]=[];


  getIngredient(id: number): void {
    this.service.getIngredientById(id).subscribe(
      (res: any) => {
        this.ingredient = res;
        console.log(res);

      },
      (err: any) => {

        console.log(err);
      }
    );
  }

  editIngredient(form: NgForm) {
    this.service.putIngredient().subscribe(
      res => {
        this.resetForm(form);
      },
      err => {
        console.log(err);
      }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formDataIngredient = new IngredientModel();
  }

}
