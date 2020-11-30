export class Recipe {
    //"public" before each property name indicates it will be publicly accessible
    public name: string;
    public description: string;
    public imagePath: string;
    //stores the path to the image we wish to show

    constructor(name: string, desc: string, imagePath: string) {
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
    }
}