import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import {RecipesResolverService} from "./recipes/recipes-resolver.service";

const appRoutes: Routes = [
  {
    path: "",
    redirectTo: "/recipes",
    pathMatch: "full"
  },
  { path: "recipes",
    resolve: [RecipesResolverService],
    loadChildren: () => import("./recipes/recipes.module").then(m => m.RecipesModule),
  },
  {
    path: "shopping-list",
    loadChildren: "./shopping-list/shopping-list.module#ShoppingListModule"
  },
  {
    path: "auth",
    loadChildren: "./auth/auth.module#AuthModule"
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
