import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {Ingredient} from "../../shared/ingredient.model";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode: boolean = false;
  editedIngredientIndex: number;
  editedIngredient: Ingredient;

  @ViewChild('form', {static: false}) shoppingListForm: NgForm;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
        (index: number) => {
          this.editMode = true;
          this.editedIngredientIndex = index;
          this.editedIngredient = this.shoppingListService.getIngredient(index);
          this.shoppingListForm.setValue({
            name: this.editedIngredient.name,
            amount: this.editedIngredient.amount
          })
        }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onAddIngredient(form: NgForm): void {
    const value = form.value;
    if(value.name!=='' && value.amount!='') {
      if (this.editMode) {
        this.shoppingListService.updateIngredient(this.editedIngredientIndex, {
          name: value.name,
          amount: value.amount
        })
      }
      else {
        this.shoppingListService.addIngredient({
          name: value.name,
          amount: value.amount
        });
      }
    }
    this.editMode = false;
    this.shoppingListForm.reset();
  }

  onDelete(): void {
    this.shoppingListService.deleteIngredient(this.editedIngredientIndex);
    this.onClear();
  }

  onClear(): void {
    this.editMode = false;
    this.shoppingListForm.reset();
  }

}
