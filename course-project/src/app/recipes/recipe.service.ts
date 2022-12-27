import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";
import {Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    recipesUpdated: Subject<Recipe[]> = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe(
    //         'Chicken Burger',
    //         'Chicken burger with a side of french fries!',
    //         'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Burger_with_fried_onions_and_Frensh_fries.jpg/640px-Burger_with_fried_onions_and_Frensh_fries.jpg',
    //         [
    //             new Ingredient('Buns', 2),
    //             new Ingredient('Chicken', 1),
    //             new Ingredient('Fries', 20),
    //             new Ingredient('Onion', 1),
    //             ]
    //         ),
    //     new Recipe(
    //         'Steak',
    //         'A tasty medium rare steak',
    //         'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Steak_on_the_grid.JPG/640px-Steak_on_the_grid.JPG',
    //         [
    //             new Ingredient('Meat', 1)
    //             ]
    //         ),
    // ];
    private recipes: Recipe[] = [];

    getRecipes(): Recipe[] {
        return this.recipes.slice();
    }

    getRecipe(index: number): Recipe {
        return this.recipes[index];
    }

    addRecipe(recipe: Recipe): void {
        this.recipes.push(recipe);
        this.recipesUpdated.next(this.getRecipes());
    }

    updateRecipe(index: number, updatedRecipe: Recipe): void {
        this.recipes[index] = updatedRecipe;
        this.recipesUpdated.next(this.getRecipes());
    }

    deleteRecipe(index: number): void {
        this.recipes.splice(index, 1);
        this.recipesUpdated.next(this.getRecipes());
    }

    setRecipes(newRecipes: Recipe[]): void {
        this.recipes = newRecipes;
        this.recipesUpdated.next(this.getRecipes());
    }
}