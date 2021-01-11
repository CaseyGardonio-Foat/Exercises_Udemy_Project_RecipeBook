import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service'

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  // @ViewChild('nameInput',) nameInputRef: ElementRef; 
  // //for this exercise, we will not use this inside of ngOnInit, so in Angular 9+, we don't need a second argument;
  // //if we *were* going to use this inside of ngOnInit, we would still need to add {static: true} as a second argument here
  // @ViewChild('amountInput') amountInputRef: ElementRef;
  // // ingredientAdded = new EventEmitter<{name: string, amount: number}>();
  // //the type passed above in the <> corresponds to the objects in the ingredients array in shopping-list
  subscription = new Subscription;
  editMode: boolean = false;
  editedItemIndex: number;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.shoppingListService.ingredientStartedEditing.subscribe(
      (index: number)=>{
        this.editMode = true;
        this.editedItemIndex = index;
      }
    )
  }

  onAddItem(form: NgForm) {
    /* Old method using inputRef and event listeners: 
    const newIngredient = new Ingredient(   
      this.nameInputRef.nativeElement.value,
      this.amountInputRef.nativeElement.value,
    )
    //line 25 declares a variable and assigns it to hold a new object in the Ingredient class/datatype
    //lines 26 and 27 assign the values of nameInputRef and amountInputRef as the values for the properties of this newIngredient object
    //remember, this.nameInputRef.nativeElement.value is equal to the user input into the input field referenced with #nameInput
    //const is used instead of let because these variables will only be assigned values one time for each new Item added by this method
    */
    
    /* New method using angular template-driven forms:*/
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
   
    this.shoppingListService.addIngredient(newIngredient);
    /*now that the new Ingredient object is created, we can emit it as an event that the shopping-list can listen for
    */

  }

}
