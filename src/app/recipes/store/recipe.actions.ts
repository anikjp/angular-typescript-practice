import { Action } from "@ngrx/store";
import {Recipe} from "../recipe.model";

export const SET_RECIPE = "[Recipe] Set Recipe";
export const FETCH_RECIPE = "[Recipe] Fetch Recipe";

export class SetRecipe implements Action {
    readonly type = SET_RECIPE;
    constructor(public payload: Recipe[]) {}
}

export class FetchRecipe implements Action {
    readonly type = FETCH_RECIPE;
}

export type RECIPE_ACTIONS = SetRecipe | FetchRecipe;


