const menu = {
  _courses: {
    appetizers: [],
    mains: [],
    desserts: [],
  },
  set appetizers(appetizerToAdd) {
    this._courses.appetizers.push(appetizerToAdd);
  },
  set mains(mainToAdd) {
    this._courses.mains.push(mainToAdd);
  },
  set desserts(dessertToAdd) {
    this._courses.desserts.push(dessertToAdd);
  },
  get appetizers() {
    return this._courses.appetizers;
  },
  get mains() {
    return this._courses.mains;
  },
  get desserts() {
    return this._courses.desserts;
  },
  get courses() {
    return {
      appetizers: this.appetizers,
      mains: this.mains,
      desserts: this.desserts,
    };
  },
  addDishToCourse: function (courseName, dishName, dishPrice) {
    const dishToAdd = {
      name: dishName,
      price: dishPrice,
    };
    this[courseName] = dishToAdd;
  },
  getRandomDishFromCourse: function (courseName) {
    const dishes = this._courses[courseName];
    const randNum = Math.floor(Math.random() * dishes.length);
    return dishes[randNum];
  },
  generateRandomMeal: function () {
    const appetizer = this.getRandomDishFromCourse('appetizers');
    const main = this.getRandomDishFromCourse('mains');
    const dessert = this.getRandomDishFromCourse('desserts');
    const totalPrice = appetizer.price + main.price + dessert.price;
    return `Course meals:\nAppetizer: ${appetizer.name}\nMain: ${main.name}\nDessert: ${dessert.name}\nTotal price: ${totalPrice}`;
  },
};

menu.addDishToCourse('appetizers', 'Pasta Chips', 10);
menu.addDishToCourse('appetizers', 'Cranberry Brie Bites', 12);
menu.addDishToCourse('appetizers', 'Sweet Potato Bites', 8);

menu.addDishToCourse('mains', 'Lasagne', 25);
menu.addDishToCourse('mains', 'Cordon Bleu', 40);
menu.addDishToCourse('mains', 'Fried Salmon with Potato Salad', 35);

menu.addDishToCourse('desserts', 'Chocolate Fudge', 10);
menu.addDishToCourse('desserts', 'Lava Cake', 13);
menu.addDishToCourse('desserts', 'Strudel', 7);

const meal = menu.generateRandomMeal();
console.log(meal);
