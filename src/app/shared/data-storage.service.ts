import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap} from "rxjs/operators";

import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import * as fromApps from "../store/app.reducer";
import * as RecipeActions from "../recipes/store/recipe.actions";
import {Store} from "@ngrx/store";

@Injectable({ providedIn: "root" })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private store: Store<fromApps.AppState>) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        "https://angular-practice-23a66.firebaseio.com/recipes.json",
        recipes
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        "https://angular-practice-23a66.firebaseio.com/recipes.json"
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          // this.recipeService.setRecipes(recipes);
          console.log(recipes);
          this.store.dispatch(new RecipeActions.SetRecipe(recipes));
        })
      );
  }
}
