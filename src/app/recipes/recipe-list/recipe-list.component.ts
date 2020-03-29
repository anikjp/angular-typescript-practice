import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipe.service";
import {Store} from "@ngrx/store";
import {map} from "rxjs/operators";
import * as fromApps from "../../store/app.reducer";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"]
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute,
              private store: Store<fromApps.AppState>) {
  }

  ngOnInit() {
    this.store
        .select("recipe")
        .pipe(map(recipeData => recipeData.recipes))
        .subscribe(recipes => {
          console.log("---RecipeListComponent----");
          this.recipes = recipes;
        });
    // this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate(["new"], {relativeTo: this.route});
  }

}
