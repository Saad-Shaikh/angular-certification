import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({
    providedIn: 'root'
})
export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing: Subject<number> = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 15),
      ];

      getShoppingList(): Ingredient[] {
          return this.ingredients.slice();
      }

      getIngredient(index: number): Ingredient {
          return this.ingredients[index];
      }

      addIngredient(ingredient: Ingredient): void {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      addIngredients(ingredients: Ingredient[]): void {
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      updateIngredient(index: number, updatedIngredient: Ingredient): void {
          this.ingredients[index] = updatedIngredient;
          this.ingredientsChanged.next(this.ingredients.slice());
      }

      deleteIngredient(index: number): void {
          this.ingredients.splice(index, 1);
          this.ingredientsChanged.next(this.ingredients.slice());
      }
}