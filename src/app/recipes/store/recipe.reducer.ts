import {Recipe} from "../recipe.model";
import * as RecipeActions from "./recipe.actions";

export interface State {
    recipes: Recipe[];
}

const initialState: State = {
    recipes: [],
};

export function recipeReducer(
    state = initialState,
    action: RecipeActions.RECIPE_ACTIONS) {
    switch (action.type) {
        case RecipeActions.SET_RECIPE:
            return {
                ...state,
                recipes: [...action.payload]
            };

        // case RecipeActions.FETCH_RECIPE:
        //     return state;

        default:
            return state;
    }

}
