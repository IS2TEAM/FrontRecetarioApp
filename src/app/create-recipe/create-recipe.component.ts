import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AppService} from "../service-app.service";
import {NgForm} from "@angular/forms";
import {RecetaModel} from "../models/receta.model";
import {DomSanitizer} from '@angular/platform-browser';
import {RecipeService} from "../view-ingredients/RecipeService.service";
import {IngredientRecipeModel} from "../models/IngredientRecipe.model";
import {DatosCompartidosService} from '../DatosCompartidosService';
import {DatosCompartidosLogin} from '../DatosCompartidosLogin';
import {IngredientModel} from "../models/ingredients.model";
import {ToastrService} from "ngx-toastr";
import {UserModel} from "../loging/user.model";


@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent implements OnInit {

  imgWidth = '100%';
  imageUrl: string | null = null;
  imageFile: File | null = null;
  inspectionList$!: Observable<any[]>;
  ingredientList$!: Observable<any[]>;
  inspectionList: any[] = [];
  ingredientList: any[] = [];
  formValues: any[] = [];
  arrayI: any = new IngredientModel();
  arrayO: any = new RecetaModel();
  public array: RecetaModel[];
  userList: UserModel[] | undefined = [];

  constructor(public service: AppService, public toastr: ToastrService, public sanitizer: DomSanitizer, public RecetasService: RecipeService, private datosCompartidosService: DatosCompartidosService, private datosCompartidos: DatosCompartidosLogin) {
    this.array = [];
    this.getUserData();
    this.ngOnInit();
  }

  findUserIdByEmail(userModel: UserModel[] | undefined): number {
    const emailUser = this.datosCompartidos.obtenerDato(); // Obtén el email del modelo
    if (userModel !== undefined) {
      const foundUser = userModel.find(user => user.emailUser === emailUser); // Busca el usuario por su email
      if (foundUser) {
        this.service.formDataReceta.userId = foundUser.idUser;
      } else {
        return 0; // Si no se encuentra el usuario, devuelve un valor predeterminado (0 en este caso)
      }
    }
    return 0;
  }


  async getUserData(): Promise<UserModel[] | undefined> {
    const users = await this.service.getUser().toPromise();
    this.userList = users;
    console.log("USUARIOS: ", users);
    this.findUserIdByEmail(users);
    return this.userList;
  }




  ngOnInit(): void {
    this.ingredientList$ = this.RecetasService.getInspectionList();
    this.ingredientList$.subscribe((ingredientList) => {
      this.ingredientList = ingredientList;
    });

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

  addIngredient() {
    this.service.formDataIngredient.idIngredient = this.findIngredientIdByName(this.service.formDataIngredient.nameIngredient);
    this.arrayI = this.service.formDataIngredient;
    this.datosCompartidosService.guardarDato(this.arrayI);
    this.toastr.success("INGREDIENTE GUARDADO CON EXITO", "EXITOSO!");
  }


  convertArray(ingredients: IngredientModel[], idRecipes: number): IngredientRecipeModel[] {
    const convertedArray: IngredientRecipeModel[] = [];
    for (const ingredient of ingredients) {
      const convertedIngredient: IngredientRecipeModel = {
        idIngredient: ingredient.idIngredient,
        idRecipe: idRecipes,
        quantity: ingredient.quantity,
      };
      console.log(convertedIngredient);
      console.log(idRecipes);
      convertedArray.push(convertedIngredient);
    }
    return convertedArray;
  }

  findIngredientIdByName(name: string): number {
    const ingredient = this.ingredientList.find(item => item.nameIngredient === name);
    return ingredient?.idIngredient;
  }


  addRecipe(form: NgForm) {

    if (this.imageUrl != null && this.imageFile != null) {
      this.service.uploadImg(this.imageFile).subscribe((res: string): void => {
          this.service.formDataReceta.recipePhoto = JSON.stringify(res).split("\"")[3].replace("\"","");
          this.toastr.success("IMAGEN CREADA CON EXITO", "EXITOSO!");
          this.postRecipe(form);
        },
        (err: any) => {
          this.toastr.error("OCURRIO UN ERROR AL CREAR LA RECETA", "ERROR!");
        });
    } else {
      this.service.formDataReceta.recipePhoto = "";
      this.postRecipe(form);
    }
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formDataReceta = new RecetaModel();
    this.imageUrl = null;
  }

  private postRecipe(form: NgForm) {
    this.service.postRecipes().subscribe(
      (res: any) => {
        this.toastr.success("RECETA CREADA CON EXITO", "EXITOSO!");
        this.resetForm(form);
      },
      (err: any) => {
        this.toastr.error("OCURRIO UN ERROR AL CREAR LA RECETA", "ERROR!");
      }
    );
    this.service.getlast().then((res: RecetaModel) => {
      const arrayO = res;
      const data : IngredientRecipeModel[] = this.convertArray(this.datosCompartidosService.obtenerDato(), arrayO.idRecipe);
      for (let i = 0; i < data.length; i++) {
        this.service.postRecipesIngredient(data[i]).subscribe((res:any)=>{
          console.log(res);
        });
      }
      this.datosCompartidosService.limpiarDatos();
    });
  }


}
