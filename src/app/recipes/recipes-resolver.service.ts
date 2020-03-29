import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { take } from "rxjs/operators";

import { Recipe } from "./recipe.model";
import * as fromApps from "../store/app.reducer";
import * as RecipesActions from "./store/recipe.actions";

@Injectable({ providedIn: "root" })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private store: Store<fromApps.AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store.dispatch( new RecipesActions.FetchRecipe());
    return this.actions$.pipe(
        ofType(RecipesActions.SET_RECIPE),
        take(1)
    );
  }
}
