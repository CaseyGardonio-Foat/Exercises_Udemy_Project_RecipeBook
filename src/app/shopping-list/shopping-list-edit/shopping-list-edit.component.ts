import { Component, ElementRef, EventEmitter, OnInit, ViewChild, Output } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  @ViewChild('nameInput',) nameInputRef: ElementRef; 
  //for this exercise, we will not use this inside of ngOnInit, so in Angular 9+, we don't need a second argument;
  //if we *were* going to use this inside of ngOnInit, we would still need to add {static: true} as a second argument here
  @ViewChild('amountInput') amountInputRef: ElementRef;
  // ingredientAdded = new EventEmitter<{name: string, amount: number}>();
  //the type passed above in the <> corresponds to the objects in the ingredients array in shopping-list
  @Output() ingredientAdded = new EventEmitter<Ingredient>();
  //since we also have an INgredient model in the "shared" directory, we can use that as the type instead

  constructor() { }

  ngOnInit(): void {
  }

  onAddItem() {
    const newIngredient = new Ingredient(   
      this.nameInputRef.nativeElement.value,
      this.amountInputRef.nativeElement.value,
    )
    //line 25 declares a variable and assigns it to hold a new object in the Ingredient class/datatype
    //lines 26 and 27 assign the values of nameInputRef and amountInputRef as the values for the properties of this newIngredient object
    //remember, this.nameInputRef.nativeElement.value is equal to the user input into the input field referenced with #nameInput
    //const is used instead of let because these variables will only be assigned values one time for each new Item added by this method
    this.ingredientAdded.emit(newIngredient);
    //now that the new Ingredient object is created, we can emit it as an event that the shopping-list can listen for
  }

}
