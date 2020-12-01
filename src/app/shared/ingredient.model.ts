// export class Ingredient {
//     public name: string;
//     public amount: number;
//
//     constructor(name: string, amount: number){
//         this.name = name;
//         this.amount = amount;
//     }
// }
// //this is so common of a setup, that Angular gives us a shortcut, below, that does the same thing:

export class Ingredient {
    constructor(public name:string, public amount: number){}
}

