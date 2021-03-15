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
};

console.log(menu.courses);

menu.addDishToCourse('appetizers', 'Pasta Chips', 10);
menu.addDishToCourse('mains', 'Lasagne', 25);
menu.addDishToCourse('mains', 'Cordon Bleu', 40);
menu.addDishToCourse('desserts', 'Chocolate Fudge', 10);

console.log(menu.appetizers);
console.log(menu.mains);
console.log(menu.desserts);
