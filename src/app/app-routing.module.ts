import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LogingComponent } from './loging/loging.component';
import { RegisterComponent } from './register/register.component';
import { CrearRecetaComponent } from './crear-receta/crear-receta.component';
import { MenuComponent } from './menu/menu.component';
import { ViewRecipesComponent } from './view-ingredients/view-recipes.component';
import {ShowRecipesComponent} from "./show-recipes/show-recipes.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";

const routes: Routes = [
  // {path: '', component: ViewRecipesComponent},
  {path: 'loging', component: LogingComponent },
  {path: 'register', component: RegisterComponent},
  {path: 'view-ingredients', component: ViewRecipesComponent},
  {path: 'create-recipe', component: CrearRecetaComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'show-recipes', component: ShowRecipesComponent},
  {path: 'shoppingList', component: ShoppingListComponent}
];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
