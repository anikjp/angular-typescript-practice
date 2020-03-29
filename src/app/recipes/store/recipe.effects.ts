import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import * as RecipesActions from "../../recipes/store/recipe.actions";
import {map, switchMap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Recipe} from "../recipe.model";

@Injectable()
export class RecipeEffects {

    @Effect()
    fetchRecipes = this.actions$.pipe(
        ofType(RecipesActions.FETCH_RECIPE),
        switchMap(() => {
            return this.http
                .get<Recipe[]>("https://angular-practice-23a66.firebaseio.com/recipes.json")
        }),
        map(recipes => {
            return recipes.map(recipe => {
                return {
                    ...recipe,
                    ingredients: recipe.ingredients ? recipe.ingredients : []
                };
            });
        }),
        map(recipes => {
            return new RecipesActions.SetRecipe(recipes);
        })
    );

    constructor( private actions$: Actions, private http: HttpClient) {

    }
}



// switchMap(project: function: Observable, resultSelector: function(outerValue, innerValue, outerIndex, innerIndex): any): Observable
