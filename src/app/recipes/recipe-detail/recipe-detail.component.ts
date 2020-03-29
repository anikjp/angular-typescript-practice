import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";

import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipe.service";
import {Store} from "@ngrx/store";
import * as fromApps from "../../store/app.reducer";
import {map, switchMap} from "rxjs/operators";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"]
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromApps.AppState>) {
  }

  ngOnInit() {

    // this.route.params
    //     .pipe(
    //         map(params => {
    //           return +params.id;
    //         }),
    //         switchMap(id => {
    //           this.id = id;
    //           return this.store.select("recipe");
    //         }),
    //         map(recipesState => {
    //           return recipesState.recipes.find((recipe, index) => {
    //             return index === this.id;
    //           });
    //         })
    //     )
    //     .subscribe(recipe => {
    //       console.log("----1----", recipe);
    //       this.recipe = recipe;
    //     });

    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params.id;

          this.store
              .select("recipe")
              .pipe(
                  map( recipeData => {
                    return recipeData.recipes.find((recipe, index) => {
                      return index === this.id;
                    });
                  })
              )
              .subscribe((recipe) => {
                console.log("----2----", recipe);
                this.recipe = recipe;
              });
        }
      );
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(["edit"], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(["/recipes"]);
  }

}
