import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {NgForm} from "@angular/forms";
import {RecetaModel} from "../models/receta.model";
import {AppService} from "../service-app.service";
import {DomSanitizer} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import {IngredientModel} from "../models/ingredients.model";
import {IngredientRecipeModel} from "../models/IngredientRecipe.model";
import {DatosCompartidosService} from "../DatosCompartidosService";
import {ToastrService} from "ngx-toastr";
import {RecipeService} from "../view-ingredients/RecipeService.service";
import {UserModel} from "../loging/user.model";
import {DatosCompartidosLogin} from "../DatosCompartidosLogin";

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent {

  ingredientList: any[] = [];
  ingredientList$!: Observable<any[]>;
  imgWidth = '100%';
  imageUrl: string | null = null;
  imageFile: File | null = null;
  inspectionList$!: Observable<any[]>;
  inspectionList: any[] = [];
  arrayI: any = new IngredientModel();
  userList: UserModel[] | undefined = [];
  public array: RecetaModel[];

  constructor(public service: AppService,
              public sanitizer: DomSanitizer,
              private route: ActivatedRoute,
              public RecetasService: RecipeService,
              private datosCompartidosService: DatosCompartidosService,
              private toastr: ToastrService,
              private datosCompartidos: DatosCompartidosLogin
  ) {
    this.array = [];
    this.getUserData();
    this.ngOnInit();
    if (this.service.formDataReceta.recipePhoto !== "" && this.service.formDataReceta.recipePhoto !== "null") {
      this.imageUrl = this.service.formDataReceta.recipePhoto;
    }
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

  populateForm(item: any) {
    const idRecipe = this.route.snapshot.paramMap.get('idRecipe');

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

  findIngredientIdByName(name: string): number {
    const ingredient = this.ingredientList.find(item => item.nameIngredient === name);
    return ingredient?.idIngredient;
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


  addRecipe(form: NgForm) {
    if (!this.imageUrl?.includes("azure")) {
      if (this.imageUrl != null && this.imageFile != null) {
        this.service.uploadImg(this.imageFile).subscribe((res: string): void => {
            this.service.formDataReceta.recipePhoto = JSON.stringify(res).split("\"")[3].replace("\"", "");
            this.toastr.success("IMAGEN CREADA CON EXITO", "EXITOSO!");
            this.putRecipe(form);
          },
          (err: any) => {
            this.toastr.error("OCURRIO UN ERROR AL CREAR LA RECETA", "ERROR!");
          });
      } else {
        this.service.formDataReceta.recipePhoto = "";
        this.putRecipe(form);
      }
    } else {
      this.service.formDataReceta.recipePhoto = "";
      this.putRecipe(form);
    }
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formDataReceta = new RecetaModel();
    this.imageUrl = null;
  }

  private putRecipe(form: NgForm) {
    this.service.putRecipes().subscribe(
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
      const data: IngredientRecipeModel[] = this.convertArray(this.datosCompartidosService.obtenerDato(), arrayO.idRecipe);
      for (let i = 0; i < data.length; i++) {
        this.service.postRecipesIngredient(data[i]).subscribe((res: any) => {
          console.log(res);
        });
      }
      this.datosCompartidosService.limpiarDatos();
    });
  }
}
