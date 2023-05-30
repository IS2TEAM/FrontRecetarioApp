import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import { ToastrModule } from 'ngx-toastr';
import {FormsModule} from "@angular/forms";
import { LogingComponent } from './loging/loging.component';
import { RegisterComponent } from './register/register.component';
//import {AppRoutingModule} from "@angular/router";
import { CrearRecetaComponent } from './crear-receta/crear-receta.component';
import { MenuComponent } from './menu/menu.component';
import { ViewIngredientsComponent } from './view-ingredients/view-ingredients.component';
import { EditIngredientComponent } from './edit-ingredient/edit-ingredient.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { ShowRecipesComponent } from './show-recipes/show-recipes.component';
import { DetailsRecipeComponent } from './details-recipe/details-recipe.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { MyrecipesComponent } from './myrecipes/myrecipes.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import {FilterPipe} from "./pies/filter.pipe";
import {NgxPaginationModule} from "ngx-pagination";


@NgModule({
  declarations: [
    AppComponent,
    LogingComponent,
    RegisterComponent,
    CrearRecetaComponent,
    MenuComponent,
    ViewIngredientsComponent,
    EditIngredientComponent,
    EditRecipeComponent,
    ShowRecipesComponent,
    DetailsRecipeComponent,
    ShoppingListComponent,
    MyrecipesComponent,
    RegisterUserComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
  ],
  providers: [AppComponent],
  bootstrap: [AppComponent]
})


export class AppModule { }
