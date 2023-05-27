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

import {FormsModule} from "@angular/forms";
import { LogingComponent } from './loging/loging.component';
import { RegisterComponent } from './register/register.component';
//import {AppRoutingModule} from "@angular/router";
import { CrearRecetaComponent } from './crear-receta/crear-receta.component';
import { MenuComponent } from './menu/menu.component';
import { ViewRecipesComponent } from './view-ingredients/view-recipes.component';
import { EditIngredientComponent } from './edit-ingredient/edit-ingredient.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { ShowRecipesComponent } from './show-recipes/show-recipes.component';
import { DetailsRecipeComponent } from './details-recipe/details-recipe.component';


@NgModule({
  declarations: [
    AppComponent,
    LogingComponent,
    RegisterComponent,
    CrearRecetaComponent,
    MenuComponent,
    ViewRecipesComponent,
    EditIngredientComponent,
    EditRecipeComponent,
    ShowRecipesComponent,
    DetailsRecipeComponent
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
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { }
