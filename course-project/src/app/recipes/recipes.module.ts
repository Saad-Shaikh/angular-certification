import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {RecipesComponent} from './recipes.component';
import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipeItemComponent} from './recipe-list/recipe-item/recipe-item.component';
import {RecipeDefaultComponent} from './recipe-default/recipe-default.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {RecipesRoutingModule} from './recipes-routing.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeDefaultComponent,
        RecipeEditComponent,
    ],
    imports: [
        ReactiveFormsModule,
        RouterModule,
        RecipesRoutingModule,
        SharedModule
    ]
})
export class RecipesModule {}