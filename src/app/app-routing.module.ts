import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LogingComponent} from './loging/loging.component';
import {RegisterComponent} from './register/register.component';
import {CreateRecipeComponent} from './create-recipe/create-recipe.component';
import {MenuComponent} from './menu/menu.component';
import {ViewIngredientsComponent} from './view-ingredients/view-ingredients.component';
import {ShowRecipesComponent} from "./show-recipes/show-recipes.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {MyrecipesComponent} from "./myrecipes/myrecipes.component";
import {EditRecipeComponent} from "./edit-recipe/edit-recipe.component";
import {DetailsRecipeComponent} from "./details-recipe/details-recipe.component";


const routes: Routes = [
  {path: "", component: LogingComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: 'menu', component: MenuComponent, children: [
      {path: '', component: ShowRecipesComponent},
      {path: 'view-ingredients', component: ViewIngredientsComponent},
      {path: 'create-recipe', component: CreateRecipeComponent},
      {path: 'show-recipes', component: ShowRecipesComponent},
      {path: 'shoppingList/:id', component: ShoppingListComponent},
      {path: 'myrecipes', component: MyrecipesComponent},
      {path: 'edit-myrecipes/:id', component: EditRecipeComponent},
      {path: 'details-recipe/:id', component: DetailsRecipeComponent}
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
